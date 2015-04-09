// http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/
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
      table[i][j] = 0;
    }
  }
  var parents = [];

  for(var i=1;i<=values.length;i++){
    for(var j=0;j<=maxWeight;j++){
      var pickItem;
      var dontPickItem;
      var weightOfItem = weights[i-1];
      if(j < weightOfItem){
        pickItem = -1;
      }else{
        pickItem = table[i-1][j - weightOfItem] + values[i-1];
      }
      dontPickItem = table[i-1][j];
      parents[i] = parents[i] || [];
      if(pickItem > dontPickItem){
        table[i][j] = pickItem;
        parents[i][j] = [i-1, j-weightOfItem, true];
      }else{
        table[i][j] = dontPickItem;
        parents[i][j] = [i-1, j, false];
      }
    }
  }
  var k = values.length;
  var p = maxWeight;
  var items = [];
  while(parents[k]!== undefined && parents[k][p] !== undefined){
    var current = parents[k][p];
    if(current[2]){
      items.push(k);
    }
    k = current[0];
    p = current[1];
  }
  var maxBasedOnParents = 0;
  items.forEach(function(item){
    maxBasedOnParents += values[item-1];
  })
  console.log(maxBasedOnParents);
  // console.log(items);
  return table[values.length][maxWeight];
}

var testWeights = [];
var testValues = [];
for(var i=0;i<200;i++){
  testWeights.push(Math.floor((Math.random() * Math.random() * 10 / Math.random())));
  testValues.push(Math.floor((Math.random() * Math.random() * 10 / Math.random())));
}
// timing("KNAPSACK_RECURSIVE", knapsack_recursive, [testValues.length-1, testWeights, testValues, 10])
timing("KNAPSACK_RECURSIVE_MEMOIZED", knapsack_recursive_memoized, [testValues.length-1, testWeights, testValues, 1000, {}])
timing("KNAPSACK_DP", knapsack_dp, [testWeights, testValues, 1000])
