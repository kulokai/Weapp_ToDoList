function topData(arr,id){
  var temp = [];
  var tempdata = [];
  for(var i = 0;i<arr.length;i++){
    if(id!=arr[i].id){
      temp.push(arr[i]);
    }else{
      tempdata = arr[i];
    }
  }
  temp.unshift(tempdata);
  return temp;
}

function finishData(arr,id){
  var temp = [];
  var tempdata = [];
  for(var i = 0;i<arr.length;i++){
    if(id!=arr[i].id){
      temp.push(arr[i]);
    }else{
      tempdata = arr[i];
    }
  }
  if(tempdata.finish == 'fn'){
    tempdata.finish = null;
    temp.unshift(tempdata);
  }else{
    tempdata.finish = 'fn';
    temp.push(tempdata);
  }
  
  return temp;
}

function delDataById(arr,id){
  var temp = [];
  for(var i = 0;i<arr.length;i++){
    if(id!=arr[i].id){
      temp.push(arr[i]);
    }
  }
  return temp;
}

module.exports = {
  delDataById:delDataById,
  finishData:finishData,
  topData:topData
}
