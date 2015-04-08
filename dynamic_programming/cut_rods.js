// Recursive
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

var res = cut_rods([0, 1, 5, 8, 9, 10, 17, 20, 24, 30], 4);
console.log(res);

function cut_rods_memoized(prices, length){
  var table = {};
  function cut_rods(prices, length){
    if(length === 0){
      return 0;
    }
    var maxVal = Number.NEGATIVE_INFINITY;

    for(var i=1;i<=length;i++){
      var subVal;
      var key = (prices + " " + (length-i));
      if(key in table){
        subVal = table[key]
      }else{
        subVal = cut_rods(prices, length-i)
      }
      maxVal = Math.max(maxVal, prices[i] + subVal)
    }
    return maxVal;
  }
  return cut_rods(prices, length);
}


var res = cut_rods_memoized([0, 1, 5, 8, 9, 10, 17, 20, 24, 30], 4);
console.log(res);
