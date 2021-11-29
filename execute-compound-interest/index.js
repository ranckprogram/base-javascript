function compoundInterest(base,ratio,time){
  return base*(ratio**time)
}



console.log(compoundInterest(50000, 1.03,3))
console.log(compoundInterest(50000, 1.03,3) + compoundInterest(50000, 0.03,1))


console.log("===")

const ten = 100000
console.log(compoundInterest(ten, 1.03,3))
console.log(compoundInterest(ten, 1.03,3) + compoundInterest(ten, 0.03,1))