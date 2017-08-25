
class Account {
  constructor(balance) {
    this.transactions = new Array();
    this.balance = balance;
  }

  getBalance() {
    return this.balance;
  }

  setDeposit(amt) {
  	this.balance = parseInt(amt) + parseInt(this.balance);
  }

  getTransactions() {
  	return this.transactions;
  }
}

Account.prototype.AddTransaction = function (transaction) {
    this.transactions.push(transaction); 
}

class SavingsAccount extends Account {

  constructor(accountNum, transactions, balance) {
    super(transactions, balance);
    this.accountNum = accountNum;
  }
  getAccountNum() {
  	return this.accountNum;
  }
}

class CheckingAccount extends Account {

  constructor(accountNum, transactions, balance) {
    super(transactions, balance);
    this.accountNum = accountNum;
  }
  
  withdraw(amt) {
    this.balance = this.balance - amt;
    this.AddTransaction(`Withdrawal:${amt}`);
  }
}

const savings = new SavingsAccount(1, "2000");
console.log(savings.getAccountNum());
savings.AddTransaction("New");
console.log(savings.getTransactions());
console.log(savings);
savings.setDeposit("200");
console.log("After depositing savings balance is: " +savings.getBalance());

const checking = new CheckingAccount(2, "3000");
checking.withdraw("100");
console.log("After withdrawing checking balance is: " +checking.getBalance());
console.log(checking);
