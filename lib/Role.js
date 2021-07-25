// create Role class
class Role {
  //create a constructor function that takes in first name, last name, role, manager, and sets them as properties of the Role
  constructor(name, salary, department) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  getName() {
    return this.name;
  }

  getSalary() {
    return this.salary;
  }

  getDepartment() {
    return this.department;
  }
};

// export Role
module.exports = Role;
