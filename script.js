//1) Factory Pattern (Student Creator)

class BaseStudent {
  constructor({ fullName, stage }) {
    this.fullName = fullName;
    this.stage = stage;
  }

  describe() {
    return `${this.fullName} -> ${this.stage}`;
  }
}

class PrimaryStudent extends BaseStudent {
  constructor(fullName) {
    super({ fullName, stage: "Primary School" });
    this.category = "Kids";
  }
}

class CollegeStudent extends BaseStudent {
  constructor(fullName) {
    super({ fullName, stage: "College" });
    this.category = "Higher Education";
  }
}

class StudentCreator {
  static make(kind, fullName) {
    const map = {
      primary: () => new PrimaryStudent(fullName),
      college: () => new CollegeStudent(fullName),
    };

    const create = map[kind];
    if (!create) throw new Error(`Student kind not supported: ${kind}`);

    return create();
  }
}


const stA = StudentCreator.make("primary", "Sohila");
console.log(stA.describe());

const stB = StudentCreator.make("college", "Ahmed");
console.log(stB.describe());

console.log("================================");


// 2) Singleton Pattern (Active Counter)
class Counter {
  constructor() {
    if (Counter.instance) {
      return Counter.instance;
    }
    this.count = 0;
    Counter.instance = this;
  }

  increment() {
    this.count++;
  }

  getCount() {
    return this.count;
  }
}


const c1 = new Counter();
const c2 = new Counter();

c1.increment();
c2.increment();

console.log("Count =", c1.getCount()); 
console.log("Same object?", c1 === c2); 
// 3) Prototype Pattern (Clone Doc)


class ReportDoc {
  constructor({ header, footer, pages, content }) {
    this.header = header;
    this.footer = footer;
    this.pages = pages;
    this.content = content;
  }

  clone() {

    return new ReportDoc({
      header: this.header,
      footer: this.footer,
      pages: this.pages,
      content: this.content
    });
  }

  summary() {
    return `${this.header} | pages: ${this.pages} | text: ${this.content}`;
  }
}


const base = new ReportDoc({
  header: "Company Report",
  footer: "© 2026",
  pages: 8,
  content: "Initial content",
});

const copy1 = base.clone({ content: "Edited content" });
console.log(base.summary());
console.log(copy1.summary());

console.log("================================");


// 4) Builder Pattern (PizzaBuilder)

class PizzaOrder {
  constructor({ size, crust, extras }) {
    this.size = size;
    this.crust = crust;
    this.extras = extras; 
  }

  toString() {
    return `Pizza(${this.size}, ${this.crust}) -> [${this.extras.join(", ")}]`;
  }
}

class PizzaOrderBuilder {
  constructor() {
    this._size = "M";
    this._crust = "classic";
    this._extras = [];
  }

  size(value) {
    this._size = value;
    return this;
  }

  crust(value) {
    this._crust = value;
    return this;
  }

  add(extra) {
    this._extras.push(extra);
    return this;
  }

  build() {
   
    return new PizzaOrder({
      size: this._size,
      crust: this._crust,
      extras: [...this._extras],
    });
  }
}

const order = new PizzaOrderBuilder()
  .size("L")
  .crust("thin")
  .add("cheese")
  .add("pepperoni")
  .build();

console.log(order.toString());