var timing = function(name, func, args){
  var start = Date.now();
  var result = func.apply(null, args);
  var stop = Date.now();
  console.log(name, "time=", stop-start, "result=", result);
}

function knapsack_recursive(currentItem, weights, values, weightLeft){
  if(weightLeft === 0){
    return 0;
  }
  if(currentItem < 0){
    return 0;
  }
  var valueIfTaken;
  var valueIfNotTaken;
  var currentItemWeight = weights[currentItem];
  if(weightLeft < currentItemWeight){
    valueIfTaken = -1;
  }else{
    valueIfTaken = values[currentItem] + knapsack_recursive(currentItem - 1, weights, values, weightLeft - currentItemWeight);
  }

  valueIfNotTaken = knapsack_recursive(currentItem - 1, weights, values, weightLeft);

  return Math.max(valueIfTaken, valueIfNotTaken);
}

function knapsack_recursive_memoized(currentItem, weights, values, weightLeft, memoizedTable){
  // Check if memoized, if so, return immediately.
  var key = (currentItem + " " + weightLeft);
  if(memoizedTable[key] !== undefined){
    return memoizedTable[key];
  }
  if(weightLeft === 0){
    return 0;
  }
  if(currentItem < 0){
    return 0;
  }
  var valueIfTaken;
  var valueIfNotTaken;
  var currentItemWeight = weights[currentItem];
  if(weightLeft < currentItemWeight){
    valueIfTaken = -1;
  }else{
      valueIfTaken = values[currentItem] + knapsack_recursive_memoized(currentItem - 1, weights, values, weightLeft - currentItemWeight, memoizedTable)
  }

  valueIfNotTaken = knapsack_recursive_memoized(currentItem - 1, weights, values, weightLeft, memoizedTable)

  var res = Math.max(valueIfTaken, valueIfNotTaken);
  // Memoize result
  memoizedTable[key] = res;
  return res;
}

function knapsack_dp(weights, values, maxWeight){
  var table = [];
  // Construct base table with 0 values
  // Consider item = 0 to correspond with table[1]
  for(var i=0;i<=values.length;i++){
    table[i] = [];
    for(var j=0;j<=maxWeight;j++){
      table[j] = 0;
    }
  }


}

var testWeights = [];
var testValues = [];
for(var i=0;i<70;i++){
  testWeights.push(Math.floor((Math.random() * Math.random() * 10 / Math.random())));
  testValues.push(Math.floor((Math.random() * Math.random() * 10 / Math.random())));
}
timing("KNAPSACK_RECURSIVE", knapsack_recursive, [testValues.length-1, testWeights, testValues, 11])
timing("KNAPSACK_RECURSIVE_MEMOIZED", knapsack_recursive_memoized, [testValues.length-1, testWeights, testValues, 11, {}])
