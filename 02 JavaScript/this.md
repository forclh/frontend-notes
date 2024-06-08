# 这是啥？

<img src="http://mdrs.yuanjin.tech/img/20211213054951.png" alt="image-20211213054946368"  />

不同的场景，**这** 指代的含义不同，JS中的**this**关键字也是如此：

- 在全局代码中使用this，指代全局对象

  > 在真实的开发中，很少在全局代码使用this

- **在函数中使用this，它的指向完全取决于函数是如何被调用的**

  | 调用方式         | 示例                | 函数中的this指向  |
  | ---------------- | ------------------- | ----------------- |
  | **通过new调用**  | `new method()`      | 新对象            |
  | **直接调用**     | `method()`          | 全局对象          |
  | **通过对象调用** | `obj.method()`      | 前面的对象        |
  | **call**         | `method.call(ctx, 参数1,参数2,..)`  | call的第一个参数  |
  | **apply**        | `method.apply(ctx,[参数1,参数2,..])` | apply的第一个参数 |
  |                  |                     |                   |

  
>在定义函数时this的指向不知道

### 练习题
#### 题一
```js
var person1 = {
  name: 'monica',
  age: 17,
  sayHi: function () {
    // 完成该方法，打印姓名和年龄
  },
};
```

```js
var person = {
  name: 'monica',
  age: 17,
  sayHi: function () {
    // 完成该方法，打印姓名和年龄
    console.log(this.name, this.age);
  },
};

person.sayHi();
```

>普通对象中的方法应该使用this访问该对象中的属性
#### 题二:为所有对象添加方法print，打印对象的键值对
```js
Object.prototype.print = function () {
  for (let key in this) {
    // 判断这个属性是不是属于对象本身，而不是在隐式原型上
    if (this.hasOwnProperty(key)) {
      console.log(`${key}:${this[key]}`);
    }
  }
}

let obj1 = [
  1, 2, 3
];
let obj2 = {
  a: '1',
  b: '2',
  c: '3'
}

obj1.print()
obj2.print()

```

#### 不使用new，通过User函数创建对象（不能更改User函数）
```js
function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = firstName + lastName;
}

// 能否不使用new，通过User函数创建对象（不能更改User函数）
u = {}
User.call(u, 'Aiden', 'Kao');
console.log(u);
```