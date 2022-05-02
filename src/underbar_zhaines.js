(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = (val) => val;

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : n === 0 ? [] : array.slice(0, n);
  };


  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    let len = array.length - 1;
    return n === undefined ? array[len] : n === 0 ? [] : array.slice(-n);
  };


  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  }




  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (item, index) {

      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };




  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    let results = [];
    for (let value of collection) {
      if (test(value)) {
        results.push(value);
      }
    }
    return results;
  };



  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    let results = [];

    for (let value of collection) {
      if (!test(value)) {
        results.push(value);
      }
    }
    return results;
  };





  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    return [...new Set(array)];
  };




  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    const result = [];
    _.each(collection, val => result.push(iterator(val)))
    return result;
  };

  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages



  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function (item) {
      return item[key];
    });
  };



  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.


  _.reduce = (collection, iterator, accumulator) => {

    // _.each iterator = iterator(value, key, collection)
    _.each(collection, (val, i) => {
      if (accumulator === undefined && i === 0) {
        accumulator = val
      } else {
        accumulator = iterator(accumulator, val)
      }
    })
    return accumulator;
  }

  // how to skip to the next element in map if memo/accumulator is undefined??????
  // use filter method???

  // let newArray = [];
  // if(!Array.isArray(collection)){
  //   newArray = Object.values(collection);
  // } else {
  //   newArray = [...collection]
  // }
  // if (accumulator === undefined) {
  //   accumulator = newArray[0];
  //   for (let i = 1; i < newArray.length; i++) {
  //     accumulator = iterator (accumulator, newArray[i])
  //   }
  // } else {
  //   for (let i = 0; i < newArray.length; i++) {
  //     accumulator = iterator(accumulator, newArray[i]);
  //   }
  // }
  // return accumulator;
  /* Previous Attempt */

  //   let newArray = []
  //   if(!Array.isArray(collection)) {
  //     newArray = Object.values(collection)
  //   } else {
  //     newArray = [...collection];
  //   }

  //   if (accumulator === undefined) {
  //     accumulator = newArray[0];
  //     newArray = newArray.shift();
  //   }
  //   _.map(newArray, val => {
  //     accumulator = iterator(accumulator, val);
  //   })
  //   return accumulator;
  // }

  /* First Attempt */

  // _.reduce = (collection, iterator, accumulator) => {

  //   if (accumulator === undefined) {
  //     accumulator = collection[0];
  //     var i = 1;
  //   } else {
  //     var i = 0;
  //   }
  //   while (i < collection.length) {
  //     accumulator = iterator(accumulator, collection[i]);
  //     i++
  //   }
  //   return accumulator;
  // };

  // _.map = function(collection, iterator) {
  //   const result = [];
  //   _.each(collection, val => result.push(iterator(val)))
  //   return result;
  // };


  // if (accumulator === undefined) {
  //   accumulator = collection[0];
  //   var i = 1;
  // } else {
  //   var i = 0;
  // }
  // while (i < collection.length) {
  //   accumulator = iterator(accumulator, collection[i]);
  //   i++
  // }
  // return accumulator;





  /* ------------------------- END OF PART I - START OF PART II ------------------------- */


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };





  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator = _.identity) {
    return _.reduce(collection, (isTrue, item) => {
      if (isTrue) {
        return !!iterator(item);
      }
      else {
        return isTrue;
      }
    }, true);
  }
// fasly values = "" 0, false, NaN, undefined 1, 3 {}
// loogical not operator ! aka negation truthy





    // Determine whether any of the elements pass a truth test. If no iterator is
    // provided, provide a default one
    _.some = function (collection, iterator = _.identity) {
      // TIP: There's a very clever way to re-use every() here.
      if (collection.length < 1) return false;

      return !_.every(collection, val => !iterator(val));
      //

    };

    /**
     * OBJECTS
     * =======
     *
     * In this section, we'll look at a couple of helpers for merging objects.
     */

    // Extend a given object with all the properties of the passed in
    // object(s).
    //
    // Example:
    //   var obj1 = {key1: "something"};
    //   _.extend(obj1, {
    //     key2: "something new",
    //     key3: "something else new"
    //   }, {
    //     bla: "even more stuff"
    //   }); // obj1 now contains key1, key2, key3 and bla
    _.extend = (obj, ...vars) => Object.assign(obj, ...vars);


    // Like extend, but doesn't ever overwrite a key that already
    // exists in obj

    // ---- TEST 4 ----
    // var destination = { a: 1, b: 2 };
    // var source = { a: 100, b: 200, c: 300 };
    // -------> _.defaults(destination, source);
    // expect(destination.a).to.equal(1);
    // expect(destination.b).to.equal(2);
    // expect(destination.c).to.equal(300);

    // ---- TEST 6 ----
    // var destination = {};
    // var source = { a: 1 };
    // var anotherSource = { b: 2, c: 'three' };
    // var aThirdSource = { d: 'four' };
    // -------> _.defaults(destination, source, anotherSource, aThirdSource);
    // expect(destination.a).to.equal(1);
    // expect(destination.b).to.equal(2);
    // expect(destination.c).to.equal('three');
    // expect(destination.d).to.equal('four');

    _.defaults = function (obj, ...args) {

      for (let currentObj of args) {
        for (let key in currentObj) {
          // console.log(key);
          if(!Object.keys(obj).includes(key)){
            obj[key] = currentObj[key];
          }
        }
      }
      // console.log(obj);
      return obj;
    }



    /**
     * FUNCTIONS
     * =========
     *
     * Now we're getting into function decorators, which take in any function
     * and return out a new version of the function that works somewhat differently
     */

    // Return a function that can be called at most one time. Subsequent calls
    // should return the previously returned value.
    _.once = function (func) {
      // TIP: These variables are stored in a "closure scope" (worth researching),
      // so that they'll remain available to the newly-generated function every
      // time it's called.
      var alreadyCalled = false;
      var result;

      // TIP: We'll return a new function that delegates to the old one, but only
      // if it hasn't been called before.
      return function () {
        if (!alreadyCalled) {
          // TIP: .apply(this, arguments) is the standard way to pass on all of the
          // infromation from one function call to another.
          result = func.apply(this, arguments); // func.apply memorizes a function previously passed and its arguments
          alreadyCalled = true; // this variable will be available in the future in the closed scope of this function
        }
        // The new function always returns the originally computed result.
        return result;
      };
    };

/* -------------------------  CURRENT FUNCTION  --------------------------------- */

    // Memorize an expensive function's results by storing them. You may assume
    // that the function only takes primitives as arguments.
    // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
    // same thing as once, but based on many sets of unique arguments.
    //
    // _.memoize should return a function that, when called, will check if it has
    // already computed the result for the given argument and return that value
    // instead if possible.
    _.memoize = function (...func) {
      let memory = []

      for (const item of func) {
        let oneTime = _.once(item)
        memory.push(oneTime);
        console.log(memory);
      }
    };

    // _.memoize = function(func) {
    //   var memoryArray = [];
    //     return function() {
    //       var result;
    //         //loop and see if the new parameters have been memorized already
    //       for (let item of memoryArray) {
    //         // console.log(`loop running`);
    //         let val = item.slice(-1)[0];
    //         let parameters = item.slice(0, item.length-1);
    //         if (areEqual(arguments, parameters)){
    //           // console.log('match found, returning a value')
    //           return val;
    //         } else if (Array.isArray(arguments[0])) {
    //           // console.log('array found, ending function execution');
    //           return;
    //         }
    //       }
    //       result = func.apply(this, arguments);
    //       var inputResult = [];
    //       inputResult = Array.from(arguments);
    //       inputResult.push(result);
    //       memoryArray.push(inputResult);
    //         // console.log('no match found, pushing to memory array')
    //       return result;
    //     };
    //   };

/* -------------------------  CURRENT FUNCTION  --------------------------------- */

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    //
    // The arguments for the original function are passed after the wait
    // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
    // call someFunction('a', 'b') after 500ms
    _.delay = function (func, wait, ...args) {
      // inputs : function, wait time, ...parameters (params of function)
      // outputs: function executes (with params) after wait time in milliseconds
      setTimeout(func, wait, ...args);
    };

    /**
     * ADVANCED COLLECTION OPERATIONS
     * ==============================
     */

    // Randomizes the order of an array's contents.
    //
    // TIP: This function's test suite will ask that you not modify the original
    // input array. For a tip on how to make a copy of an array, see:
    // http://mdn.io/Array.prototype.slice

    _.shuffle = function (array) {
      var clonedArray = array.slice();
      clonedArray.sort((a, b) => Math.random() - 0.5)
      return clonedArray;
    };

    /**
     * ADVANCED
     * =================
     *
     * Note: This is the end of the pre-course curriculum. Feel free to continue,
     * but nothing beyond here is required.
     */

    // Calls the method named by functionOrKey on each value in the list.
    // Note: You will need to learn a bit about .apply to complete this.
    _.invoke = function (collection, functionOrKey, args) {
    };

    // Sort the object's values by a criterion produced by an iterator.
    // If iterator is a string, sort objects by that property with the name
    // of that string. For example, _.sortBy(people, 'name') should sort
    // an array of people by their name.
    _.sortBy = function (collection, iterator) {
    };

    // Zip together two or more arrays with elements of the same index
    // going together.
    //
    // Example:
    // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
    _.zip = function () {
    };

    // Takes a multidimensional array and converts it to a one-dimensional array.
    // The new array should contain all elements of the multidimensional array.
    //
    // Hint: Use Array.isArray to check if something is an array
    _.flatten = function (nestedArray, result) {
    };

    // Takes an arbitrary number of arrays and produces an array that contains
    // every item shared between all the passed-in arrays.
    _.intersection = function () {
    };

    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = function (array) {
    };

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time.  See the Underbar readme for extra details
    // on this function.
    //
    // Note: This is difficult! It may take a while to implement.
    _.throttle = function (func, wait) {
    };
  }());
