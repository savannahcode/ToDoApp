// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
//import "styles.css"

// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
var todos = [{
  todoID: 0,
  todoText: "Finish Homework",
  todoCategory: 0,
  todoDueDate: "12/16/2023",
  todoComplete: false,
  todoDeleted: false
}, {
  todoID: 1,
  todoText: "Walk the dog",
  todoCategory: 0,
  todoDueDate: "12/16/2023",
  todoComplete: true,
  todoDeleted: false
}, {
  todoID: 2,
  todoText: "Clean my room",
  todoCategory: 0,
  todoDueDate: "12/16/2023",
  todoComplete: false,
  todoDeleted: false
}];
// oct 11 @ 11:38
var categories = [{
  id: 0,
  categoryName: "Home"
}, {
  id: 1,
  categoryName: "School"
}, {
  id: 2,
  categoryName: "Personal"
}];

/* if someone types into "Enter new class" text field
and hits enter or the + button the addToDo function should be called. */
var inputVal = document.querySelector(".inputCheck");
inputVal.addEventListener("keydown", checkEnter);
var toDoList = document.querySelector(".todoList");
var plusButton = document.getElementById("plus");
var clearDoneButton = document.getElementById("clearDone");
var tasksLeft = document.getElementById("tasksLeft");
var editBtn = document.querySelector(".editBtn");
// EDIT TO DO MODAL items
// Get the edit modal
var editModal = document.getElementById("editModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var close = document.getElementsByClassName("close")[0];
var adjustInput = document.querySelector(".adjustToDo");
var saveChanges = document.querySelector(".saveChanges");
var markDone = document.querySelector(".markDone");
var modalBackground = modal.getElementsByClassName("modal-content")[0];
// Store the index of the todo being edited
var editingTodoIndex = -1;
function checkEnter(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    addToDo(inputVal.value);
  }
}

/* Click handler for + icon */

plusButton.addEventListener("click", function handleClick() {
  addToDo(inputVal.value);
});
clearDoneButton.addEventListener("click", function handleClick() {
  todos = todos.filter(function (todo) {
    return !todo.todoComplete;
  });
  toDoList.innerHTML = ""; // Clears the toDoList
  renderToDos(todos);
});

// delete & edit btns functionality
toDoList.addEventListener("click", function (event) {
  console.log("Event target:", event.target);
  // Check if the clicked element has the "deleteBtn" class
  if (event.target.classList.contains("deleteBtn") || event.target.parentElement.classList.contains("deleteBtn")) {
    // Your delete functionality here
    // You can access the clicked element with event.target
    if (event.target.classList.contains("deleteBtn")) {
      // for if span was clicked
      searchToDo = event.target.parentElement.textContent.trim();
    } else if (event.target.parentElement.classList.contains("deleteBtn")) {
      // for if i tag icon was clicked
      searchToDo = event.target.parentElement.parentElement.textContent.trim();
    }
    // searchToDoID = 0
    todos.forEach(function (todo) {
      if (todo.todoText === searchToDo) {
        todo.todoDeleted = true;
      }
    });
    // render todos again to deleting one
    toDoList.innerHTML = ""; // Clears the toDoList so the new one can be added
    renderToDos(todos);
  }
  // Check if the clicked element has the "editBtn" class
  if (event.target.classList.contains("editBtn") || event.target.parentElement.classList.contains("editBtn")) {
    console.log("edit btn pushed");
    // Edit Functionality here
    // When the user clicks on the button, open the modal
    editModal.style.display = "block";
    if (event.target.classList.contains("editBtn")) {
      // for if span was clicked
      adjustInput.value = event.target.parentElement.textContent.trim();
      searchToDo = adjustInput.value;
    } else if (event.target.parentElement.classList.contains("editBtn")) {
      // for if i tag icon was clicked
      adjustInput.value = event.target.parentElement.parentElement.textContent.trim();
      searchToDo = adjustInput.value;
    }
    // Store the index of the todo being edited
    console.log(searchToDo);
    editingTodoIndex = todos.findIndex(function (todo) {
      return todo.todoText === searchToDo;
    });
    console.log(editingTodoIndex);
  }
}); // FIX HERE

// CLOSE MODAL
// When the user clicks on <span> (x), close the modal
close.onclick = function () {
  editModal.style.display = "none";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == editModal) {
      editModal.style.display = "none";
    }
  };
};

// saveChanges click
saveChanges.onclick = function () {
  console.log("save changes");
  editModal.style.display = "none";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == editModal) {
      adjustInput.value;
      editModal.style.display = "none";
    }
  };
  // Check if there is a todo being edited
  if (editingTodoIndex !== -1) {
    // Update the text of the editing todo
    todos[editingTodoIndex].todoText = adjustInput.value;

    // Reset the editingTodoIndex
    editingTodoIndex = -1;

    // Render the updated to-do list
    toDoList.innerHTML = "";
    renderToDos(todos);
  }
};

// Close the modal when clicking the modal's background
modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    editModal.style.display = "none";
  }
});

// markDone click
markDone.onclick = function () {
  editModal.style.display = "none";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == editModal) {
      editModal.style.display = "none";
    }
    // Check if there is a todo being edited
    if (editingTodoIndex !== -1) {
      // Mark the editing todo as done
      todos[editingTodoIndex].todoComplete = true;

      // Reset the editingTodoIndex
      editingTodoIndex = -1;

      // Render the updated to-do list
      toDoList.innerHTML = "";
      renderToDos(todos);
    }
  };
};

/*
The function addToDo() should create a new object in the toDos array and should
create an li item in the toDoList class.
Have the toDoID be set to one more than the last item in the array.
toDoComlete should automatically be set to false.
toDoText should be whatever the user input is.
*/

function addToDo(newToDo) {
  // call the modal to select the category
  var toDoObject = {
    todoID: todos.length,
    todoText: newToDo,
    todoCategory: "TBD",
    todoDueDate: "TBD",
    todoComplete: false,
    todoDeleted: false
  };
  todos.push(toDoObject);
  console.log(todos);
  toDoList.innerHTML = ""; // Clears the toDoList so the new one can be added
  renderToDos(todos);
}
function renderToDo(todoItem) {
  var sideBtn = document.createElement("span");
  var sideBtnIcon = document.createElement("i");
  var newLi = document.createElement("li");
  sideBtnIcon.classList.add("fa-solid");
  newLi.textContent = todoItem.todoText;
  if (todoItem.todoComplete) {
    newLi.classList.add("done"); //add done class if completed
    sideBtn.classList.add("deleteBtn");
    sideBtnIcon.classList.add("fa-trash");
  } else {
    sideBtn.classList.add("editBtn");
    sideBtnIcon.classList.add("fa-pen-to-square");
  }
  toDoList.appendChild(newLi);
  newLi.appendChild(sideBtn);
  sideBtn.appendChild(sideBtnIcon);
}
function renderToDos(array) {
  // removed the deleted toDos from the displayed toDos
  var nonDeletedToDos = array.filter(function (toDo) {
    return toDo.todoDeleted === false;
  });
  nonDeletedToDos.forEach(function (todo) {
    renderToDo(todo);
  });
  var tasksLeftNum = 0;
  array.forEach(function (task) {
    if (!task.todoComplete) {
      tasksLeftNum++;
    }
  });
  tasksLeft.textContent = "You have ".concat(tasksLeftNum, " pending tasks.");
}
renderToDos(todos);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57129" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map