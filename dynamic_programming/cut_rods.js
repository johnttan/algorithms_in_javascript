// Recursive
// http://www.geeksforgeeks.org/dynamic-programming-set-13-cutting-a-rod/
function cut_rods(prices, length){
  if(length === 0){
    return 0;
  }
  var maxVal = Number.NEGATIVE_INFINITY;

  for(var i=1;i<=length;i++){
    maxVal = Math.max(maxVal, prices[i] + cut_rods(prices, length-i))
  }
  return maxVal;
}

var start = Date.now();
var res = cut_rods([0, 1, 5, 8, 9, 10, 17, 20, 24, 30, 1, 2, 3, 4, 1, 2, 3, 2, 4, 15, 20, 14, 123, 123,123,1 , 32, 21, 14, 23, 14, 23, 41, 123, 4, 23], 25);
var end = Date.now();
console.log(res, end - start);

// O(n^2)
function cut_rods_memoized(prices, length){
  var table = {};
  function cut_rods(prices, length){
    if(length === 0){
      return 0;
    }
    var maxVal = Number.NEGATIVE_INFINITY;

    for(var i=1;i<=length;i++){
      var subVal;
      var key = (String(length - i));
      if(table[key] != undefined){
        subVal = table[key]
      }else{
        subVal = cut_rods(prices, length-i)
        table[key] = subVal
      }
      maxVal = Math.max(maxVal, prices[i] + subVal)
    }
    return maxVal;
  }
  return cut_rods(prices, length);
}

var start = Date.now();
var res = cut_rods_memoized([0, 1, 5, 8, 9, 10, 17, 20, 24, 30, 1, 2, 3, 4, 1, 2, 3, 2, 4, 15, 20, 14, 123, 123,123,1 , 32, 21, 14, 23, 14, 23, 41, 123, 4, 23], 25);
var end = Date.now();
console.log(res, end - start);

// O(n^2)
function cut_rods_dp(prices, length){
  var table = [0];
  for(var i=1;i<=length;i++){
    var max = Number.NEGATIVE_INFINITY;
    for(var j=1;j<=i;j++){
        max = Math.max(max, prices[j] + table[i-j])
    }
    table[i] = max;
  }
  return table[length];
}

var start = Date.now();
var res = cut_rods_dp([0, 1, 5, 8, 9, 10, 17, 20, 24, 30, 1, 2, 3, 4, 1, 2, 3, 2, 4, 15, 20, 14, 123, 123,123,1 , 32, 21, 14, 23, 14, 23, 41, 123, 4, 23], 25);
var end = Date.now();
console.log(res, end - start);

function cut_rods_dp_with_tracking(prices, length){
  var table = [0];
  var parents = [-1];
  for(var i=1;i<=length;i++){
    var max = Number.NEGATIVE_INFINITY;
    for(var j=1;j<=i;j++){
        if(max < prices[j] + table[i-j]){
          max = prices[j] + table[i-j];
          parents[i] = j;
        }
    }
    table[i] = max;
  }
  console.log(parents);
  var n = length;
  while(n > 0){
    console.log('piece', parents[n]);
    n -= parents[n];
  }
  return table[length];
}

var start = Date.now();
var res = cut_rods_dp_with_tracking([0, 1, 5, 8, 9, 10, 17, 20, 24, 30, 1, 2, 3, 4, 1, 2, 3, 2, 4, 15, 20, 14, 123, 123,123,1 , 32, 21, 14, 23, 14, 23, 41, 123, 4, 23], 25);
var end = Date.now();
console.log(res, end - start);
