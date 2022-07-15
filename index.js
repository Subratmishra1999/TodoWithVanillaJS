const htmlElement = (item) => {
  return `<div class="content">
  <div class="first_div">${item}</div>
  <div class="second_div">
    <div class="item_button">
      <button class="edit_button" type="button">Edit</button>
      <button class="remove_button" type="button">Remove</button>
    </div>
  </div>
</div>`;
};

const createButton = ({ className = "", textContent = "", element = {} }) => {
  let btn1 = document.createElement("button");
  btn1.className = className;
  btn1.textContent = textContent;
  element.children[0].children[1].children[0].appendChild(btn1);
};

const addAdditionalButtons = (element, className) => {
  if (className === "in_progress_list" || className === "done_list") {
    createButton({
      className: "move_to_pending",
      textContent: "Move To Pending",
      element,
    });
  }
  if (className === "pending_list" || className === "done_list") {
    createButton({
      className: "move_to_in_progress",
      textContent: "Move To In-Progress",
      element,
    });
  }
  if (className === "pending_list" || className === "in_progress_list") {
    createButton({
      className: "move_to_done",
      textContent: "Move To Done",
      element,
    });
  }
};
const addItemToList = (item, className) => {
  const element = document.createElement("li");
  element.className = "list_item_pending";
  element.innerHTML = `${htmlElement(item)}`;
  console.log(element.children[0].children[1]);
  addAdditionalButtons(element, className);
  const list = document.getElementsByClassName(className);
  list[0].appendChild(element);
};

const addTodo = (e) => {
  const todoItem = document.getElementById("todo_input");
  if (todoItem.value !== "") {
    addItemToList(todoItem.value, "pending_list");
    todoItem.value = "";
  } else {
    alert("Please Enter ToDo");
  }
};

const editTodo = (e) => {
  const value =
    e.target.parentElement.parentElement.parentElement.children[0].textContent;
  const inputElement = document.createElement("input");
  inputElement.className = "change_todo";
  inputElement.placeholder = "Enter Todo";
  inputElement.value = value;
  e.target.textContent = "Done";
  e.target.parentElement.parentElement.parentElement.replaceChild(
    inputElement,
    e.target.parentElement.parentElement.parentElement.children[0]
  );
};

const doneTodo = (e) => {
  if (
    e.target.parentElement.parentElement.parentElement.children[0].value !== ""
  ) {
    const divElement = document.createElement("div");
    divElement.className = "first_div";
    divElement.textContent =
      e.target.parentElement.parentElement.parentElement.children[0].value;
    e.target.textContent = "Edit";
    e.target.parentElement.parentElement.parentElement.replaceChild(
      divElement,
      e.target.parentElement.parentElement.parentElement.children[0]
    );
  } else {
    alert("Please Enter Todo");
  }
};

const removeTodo = (e) => {
  e.target.parentElement.parentElement.parentElement.parentElement.remove();
};

const moveTodo = (e, className) => {
  let item =
    e.target.parentElement.parentElement.parentElement.children[0].textContent;
  if (item !== "") {
    addItemToList(item, className);
    removeTodo(e);
  } else {
    alert("Please Save the Todo first");
  }
};

const listItemClicked = (e) => {
  if (e.target.className === "edit_button") {
    if (e.target.textContent === "Edit") {
      editTodo(e);
    } else if (e.target.textContent === "Done") {
      doneTodo(e);
    }
  } else if (e.target.className === "remove_button") {
    removeTodo(e);
  } else if (e.target.className === "move_to_in_progress") {
    moveTodo(e, "in_progress_list");
  } else if (e.target.className === "move_to_done") {
    moveTodo(e, "done_list");
  } else if (e.target.className === "move_to_pending") {
    moveTodo(e, "pending_list");
  }
};

const addBtnElement = document.getElementById("add_button");

addBtnElement.addEventListener("click", addTodo);

const listItem = document.getElementsByClassName("todo_list");

listItem[0].addEventListener("click", listItemClicked);

class EventEmitter {
  constructor() {
    this.subscribedEventWithCallBacks = {};
  }
  subscribe(eventName, callback) {
    if (this.subscribedEventWithCallBacks[eventName]) {
      //       console.log(
      //         "this.subscribedEventWithCallBacks[eventName]",
      //         eventName,
      //         " callback",
      //         callback
      //       );
      this.subscribedEventWithCallBacks[eventName].push(callback);
    } else {
      this.subscribedEventWithCallBacks[eventName] = [callback];
    }
    console.log("subscribe", this.subscribedEventWithCallBacks);
    return {
      release: () => {
        const a = this.subscribedEventWithCallBacks[eventName].findIndex(
          (fnName, i) => {
            return fnName === callback;
          }
        );
        console.log("a is ", a, this.subscribedEventWithCallBacks);
        this.subscribedEventWithCallBacks[eventName].splice(a, 1);
        console.log("a is ", a, this.subscribedEventWithCallBacks);
      },
    };
  }

  emit(eventName, ...args) {
    if (this.subscribedEventWithCallBacks[eventName]) {
      this.subscribedEventWithCallBacks[eventName].forEach((fnName) => {
        fnName(...args);
      });
    }
    //     console.log(this.subscribedEventWithCallBacks[eventName], ...args);
  }
}

// const callback1 = (...args) => {
//   console.log("callback1 called", args);
// };
// const callback2 = (...args) => {
//   console.log("callback2 called", args);
// };

// const emitter = new EventEmitter();

// const sub1 = emitter.subscribe("event1", callback1);
// const sub2 = emitter.subscribe("event2", callback2);

// // same callback could subscribe
// // on same event multiple times
// const sub3 = emitter.subscribe("event1", callback1);
// emitter.emit("event1", 1, 2);
// sub1.release();

// function curry(func) {
//   return function curried(...args) {
//     console.log("curried args", args);
//     const complete =
//       args.length >= func.length &&
//       !args.slice(0, func.length).includes(curry.placeholder);
//     if (complete) return func.apply(this, args);
//     return function (...newArgs) {
//       // replace placeholders in args with values from newArgs
//       const res = args.map((arg) => {
//         return arg === curry.placeholder && newArgs.length
//           ? newArgs.shift()
//           : arg;
//       });
//       return curried(...res, ...newArgs);
//     };
//   };
// }

// curry.placeholder = Symbol();

// const join = (a, b, c) => {
//   return `${a}_${b}_${c}`;
// };

// const curriedJoin = curry(join);
// const _ = curry.placeholder;

// console.log(curriedJoin(1, 2, 3)); // '1_2_3'

// console.log(curriedJoin(_, 2)(1, _, _)(_, _, 3)); // '1_2_3'

// console.log(curriedJoin(_, _, _)(1)(3)(2));

// function curry(fn) {
//   // your code here
//   return (curried = (...args) => {
//     const shouldCallActucalFunction =
//       [...args].length >= fn.length &&
//       args.slice(0, fn.length).indexOf(curry.placeholder) === -1;
//     console.log(args, "shouldCall ", shouldCallActucalFunction, args);
//     if (shouldCallActucalFunction) return fn(...args);
//     return (...args2) => {
//       let newArgs = [];
//       newArgs = args.map((i) => {
//         if (i === curry.placeholder) {
//           b = args2.findIndex((j) => j !== curry.placeholder);
//           console.log(" b ", b, " args2 ", args2[b], args2);
//           if (b < 0) {
//             return i;
//           } else {
//             let c = args2[b];
//             args2.splice(b, 1);
//             return c;
//           }
//         }
//         return i;
//       });
//       return curried(...newArgs, ...args2);
//     };
//   });
// }

// function curry(func) {
//   return function curried(...args) {
//     const complete =
//       args.length >= func.length &&
//       !args.slice(0, func.length).includes(curry.placeholder);
//     if (complete) return func.apply(this, args);
//     return function (...newArgs) {
//       // replace placeholders in args with values from newArgs
//       const res = args.map((arg) => {
//         console.log(
//           "args is",
//           args,
//           "\narg is",
//           arg,
//           "\nnewArgs.length is",
//           newArgs.length,
//           "\nnewArgs",
//           newArgs
//         );
//         let a =
//           arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg;
//         console.log(
//           "args is",
//           args,
//           "\narg is",
//           arg,
//           "\nnewArgs.length is",
//           newArgs.length,
//           "\nnewArgs",
//           newArgs,
//           "\n\n\n\n\n\n"
//         );
//         return a;
//       });
//       return curried(...res, ...newArgs);
//     };
//   };
// }

function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length &&
      !args.slice(0, fn.length).includes(curry.placeholder)
      ? fn(...args)
      : (...args2) =>
          curried(
            ...args.map((a) =>
              a === curry.placeholder && args2.length ? args2.shift() : a
            ),
            ...args2
          );
  };
}
curry.placeholder = Symbol();
const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
const _ = curry.placeholder;

// console.log(curriedJoin(1, 2, 3)); // '1_2_3'

// console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'

// console.log(curriedJoin(_, _, _)(_, _, _, _, _, 6)(1, _, 3)(2));

function flat(arr, depth = 0) {
  // your imeplementation here
  let newArray = [];
  if (depth === 0) return arr;
  else {
    arr.forEach((val) => {
      console.log(val);
      if (typeof val === "object") {
        newArray.push(...flat(val, depth - 1));
      } else {
        newArray.push(val);
      }
    });
    return newArray;
  }
}
const arr = [1, [2], [3, [4]]];
// console.log(flat(arr));
// [1, 2, 3, [4]]

// console.log(flat(arr, 1));
// [1, 2, 3, [4]]

// console.log(flat(arr, 1));

function sum(num) {
  const add = (b) => {
    return b ? sum(num + b) : num;
  };
  add.valueOf = () => num;
  return add;
}
// console.log(sum(1)(2)(3)());

// function throttle(func, wait, option = { leading: false, trailing: false }) {
//   let flag = true,
//     t;
//   const { leading = false, trailing = false } = option;
//   let lastArgs = [];
//   console.log("Throttle initilaised", leading, trailing);

//   return (...args) => {
//     console.log("in throttle", ...args, flag);
//     if (flag) {
//       if (leading) {
//         flag = false;
//         func(...args);
//       }
//       setTimeout(() => {
//         flag = true;
//         if (trailing) {
//           func(...lastArgs);
//           lastArgs = [];
//         }
//         console.log("inside timeout", lastArgs, args);
//       }, wait);
//     } else {
//       console.log("saving lastargs", lastArgs, args);
//       lastArgs = [...args];
//     }
//   };
// }

let currentTime = 0;

// console.log("A@1", "B@2", "C@3", "D@5", "E@11", "F@13", "G@14");
// console.log("A@1", "C@4", "D@7", "E@11", "G@14");
// console.log(
//   run(["A@100", "B@200", "C@300", "D@500", "E@1100", "F@1300", "G@1400"])
// );
// ["A@1","C@4","D@7","E@11","G@14"]

const throttle = (func, wait, option = { leading: true, trailing: true }) => {
  const { leading = false, trailing = false } = option;
  let timer,
    lastArgs,
    flag = true;
  return (...args) => {
    if (!timer) {
      if (leading) {
        func(...args);
      }
      let timeOut = () => {
        console.log("calling timeout", trailing, lastArgs);
        if (trailing && lastArgs) {
          console.log("calling trailing");
          func(...lastArgs);
          lastArgs = null;
          timer = setTimeout(timeOut, wait);
        } else {
          timer = null;
        }
      };
      timer = setTimeout(timeOut, wait);
    } else {
      lastArgs = [...args];
    }
  };
};
const run = (input) => {
  currentTime = 0;
  const calls = [];

  const func = (arg) => {
    calls.push(`${arg}@${currentTime}`);
  };

  const throttled = throttle(func, 3, { leading: true, trailing: true });
  input.forEach((call) => {
    const [arg, time] = call.split("@");
    setTimeout(() => {
      console.log("calling throttled", arg, time);
      throttled(arg, time);
    }, time);
  });
  return calls;
};
// console.log("A@1", "B@2", "C@3", "D@5", "E@11", "F@13", "G@14");
// console.log("A@1", "C@4", "D@7", "E@11", "G@14");
// console.log(run(["A@1", "B@2", "C@3", "D@5", "E@11", "F@13", "G@14"]));
function sort(items, newOrder) {
  // reorder items inline
  newOrder.forEach((item, index) => {
    console.log(items[index], items[item])[(items[index], items[item])] = [
      items[item],
      items[index],
    ];
  });
  return items;
}
const A = ["A", "B", "C", "D", "E", "F"];
const B = [1, 5, 4, 3, 2, 0];
console.log(sort(A, B));
