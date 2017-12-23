var objword;
var inputword = "test";
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
var counter = "1,2,3,4,5,6,7,8,9,10,11,12,13".split(",");
var countsum = [];
var array = [];
var resultarray = [];
var reducedarray = [];
var lettersum = [];


$(document).ready(function() {
 
    objword = words.words;
    console.log("ready");
});


//essentially the main app
function check() {
  
  //get the input
  $("#output").html("");
  inputword = $("#word").val().toLowerCase();
  inputword = inputword.replace(/\s/g, "");
  //clear out the arrays
  var letters = [];
  countsum = [];
  
  //create an array from the input
  letters = inputword.split("");
  letters = letters.sort();
  
  inputword = letters.join();
  
  resultarray = listcreator(inputword);
  
  console.log("Number of words containing the same letters: " + resultarray.length);
  console.log(resultarray);
  
  lettersum = lettersummer(letters);
  console.log("Array showing the distribution of letters: ");
  console.log(lettersum);
  
  reducedarray = reducearray(lettersum , resultarray);
  
  console.log("Your reduced arrary: " + reducedarray.length);
  console.log(reducedarray);
  
  countsum = numsummer(countsum);
  
  console.log("Array showing distribution of word lengths: ");
  console.log(countsum);
  
  checksum(countsum);
  
  
 
  //output the results to outputdiv
  for(var i = 0; i < reducedarray.length; i++) {
    
    $("#output").append(reducedarray[i] + "\t\t");
    
  }
  
  
}//end of check


function listcreator(input) {
  var resultarray = [];
  var matches = 0;
  for(var i = 0; i < objword.length; i++) {
    var length = objword[i].length;
    var temp = 0;
    for(var j = 0; j < length; j++) {
      if(input.indexOf(objword[i].charAt(j)) > -1) {
        temp++;
        
      }
      if(temp >= length) {
        matches++;
        resultarray.push(objword[i]);
      }
    }
  }
  
  return resultarray;
  
}//end of list creator

function lettersummer(lett) {
  lettersumtemp = [];
  for(var i = 0; i < alphabet.length; i++) {
    var temp = 0;
    
    for(var j = 0; j < lett.length; j++) {
      
      if(alphabet[i] == lett[j]) {
        temp++;
      }
      
    }
    if(temp != 0) {
      var str = alphabet[i];
      var m = [ str , temp];
      lettersumtemp.push(m);
    }
    
  }
  return lettersumtemp;
}//end of lettersum

function numsummer(nums) {
  var numbersumtemp = [];
  for(var i = 0; i < counter.length; i++) {
    var temp = 0;
    
    for(var j = 0; j < nums.length; j++) {
      
      if(counter[i] == nums[j]) {
        temp++;
      }
      
    }
    if(temp != 0) {
      var str = counter[i];
      var m = [ str , temp];
      numbersumtemp.push(m);
    }
    
  }
  return numbersumtemp;
}//end of numberrsum

function checksum(arr) {
  var array = [];
  //get the length of the input
  var length = inputword.split(",").length;
  console.log("Length of input : " + length);
  //console.log(inputword);
  for (var i = 0; i < arr.length; i++) {
    var m = 0;
    var temp = 0;
    var value = parseInt( arr[i][0] , 10);
   
    while (temp < length) {
      
      m++;
      temp += value;
      if(temp <= length) {
        array[i] = m;
      }
      
    }
    
  }
  console.log(array);
  
}//end of checksum



//reduce the result array 
function reducearray(sum , reducer) {
 
  //array to store the indexes of words that dont fit
  var removearr = [];
  
  //loop array of words and find the ones that dont fit
  for(var i = 0; i < reducer.length; i++) {
    var temp = 0;
    var arr = lettersummer(reducer[i]);
    
    for(var j = 0; j < arr.length; j++) {
      for(var k = 0; k < sum.length; k++) {
        if(arr[j][0] == sum[k][0] & arr[j][1] > sum[j][1]) {
          temp++;
         
        }
      }
    }//end of nested for loop 
    
    if(temp != 0) {
      removearr.push(i);
    } 
  }//end of loop through resultsarray or reducer
 
  //replace words that dont fit will null
  for(var k = 0; k < removearr.length; k++) {
    reducer.splice(removearr[k] , 1, "");
  }
  
  //remove the null words
  for(var k = 0; k < reducer.length; k++) {
    if(reducer[k] == "") {
      reducer.splice(k , 1);
      k--;
    }
  }
  
  //push the lengths of the words to an array
  for (var m = 0; m < reducer.length; m++) {
    countsum.push(reducer[m].length);
  }
  
  return reducer;
}//end ogf reducearray

function wordchecker(arr) {
  var bool = false;
  var x = 0;
  var str = "";
  arr.forEach(function(element) {
    
    str = " - no-match"
    objword.forEach(function(e) {
      
      if(e == element.toLowerCase()) {
        str = " - match";
        x++;
      }
      
    });
    
    console.log(element + str);
  });
  
  if(x == arr.length) {
    console.log("YES");
    bool = true;
  }
  return bool;
}// end of word checcker

//add click function to search input
$("#word").keyup(function (e) {
  if(e.keyCode == 13) {
    check(); 
  }
});