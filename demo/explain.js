// this file has many extra steps that are used in order to show the setps of the cipher,
// the file keyword_columnar.js is the file used solely to encrypt or decrypt 

timeout=null // used to clear the timeout when needed 

const  get_matrix_info= (text,keyword)=>{
  
  const idx_map = map_indexes(keyword) // get key index mapping in alphabetical order
  text = text.replace(/ /g, ""); // remove spaces

  const text_array = text.toUpperCase().split('') // convert string to array

  const no_cols =idx_map.length // calculate number of columns based on the key length
  const no_rows = Math.ceil(text_array.length / no_cols) // calculate number of rows

  const rem =  text_array.length  % no_cols // calculate number of letters in the last row (partial row) if any
  const has_rem =rem != 0 // whether there is a partail row or not

  return matrix_info = {
    idx_map,
    text_array,
    key:keyword,
    no_cols, 
    no_rows ,
    rem, 
    has_rem  
  }

}


// this should be part of the map_indexes function but I don't want to change that function beacuse
// that function does not need to contain these "explaining" steps as there are not needed for encryption or decryption
const evaluate_keyword_indexes = (idx_map,keyword)=>{
  keyword_arr = keyword.toUpperCase().split('')
  letters_true_idx =[]

  idx_map.forEach((el,index)=>{

    letters_true_idx[el.orignal_index] ={
      letter:keyword_arr[el.orignal_index],
      true_index: index
    }
  })

  return letters_true_idx
}


// shows how the decryption works
const explaineEncrypt = async (matrix_info,explain_array,keyword_array)=>{

  const {no_cols,no_rows,rem,has_rem,text_array} = matrix_info

  current_row = 0
  current_col= 0
  //  WRITE HORIZONTALLY 
  for(i=0; i<text_array.length ; i++){

    explain_array[current_row][current_col] = {value:plain_arr[i],highlight:false}
    current_col++

    if(current_col== no_cols){
      current_row++
      current_col=0
    }
    await waitFor(500)
  }

  // HIGHLIGHT COLUMNS BY ORDER OF THE KEY
  for(let col=0; col<no_cols;col++){
      for(let row = 0 ; row<no_rows;row++){

      if(row+1==no_rows && has_rem  && idx_map[col].orignal_index>=rem)  // whether to skip the last row (partial row) if exist 
        break;

        explain_array[row][idx_map[col].orignal_index].highlight=true;
        keyword_array[idx_map[col].orignal_index].highlight =true

        await waitFor(500)

        explain_array[row][idx_map[col].orignal_index].highlight=false;
        keyword_array[idx_map[col].orignal_index].highlight =false
        
    }
  }
}

// shows how the decryption works
const explaineDecrypt = async(matrix_info,explain_array,keyword_array)=>{

  const {no_cols,no_rows,rem,has_rem,text_array} = matrix_info

  let current_letter= 0 // keep track of the current cipher letter

  // WRITE VERTICALLY 
  for(let col=0; col<no_cols;col++){
     for(let row = 0 ; row<no_rows;row++){
      
      if(has_rem && row+1==no_rows && idx_map[col].orignal_index>=rem) // whether to skip the last row (partial row) if exist 
        break;

        let value =  cipher_arr[current_letter++]

        // HIGHLIGHT KEYWORD
        explain_array[row][idx_map[col].orignal_index] = {value:value}
        keyword_array[idx_map[col].orignal_index].highlight = true

        await waitFor(500)

        keyword_array[idx_map[col].orignal_index].highlight = false
    }
  }

  current_row = 0
  current_col= 0
  
  // HIGHLIGHT ITEMS
  for(i=0; i<text_array.length ; i++){
    explain_array[current_row][current_col].highlight = true
    await waitFor(600)
    explain_array[current_row][current_col].highlight = false
    current_col++

    if(current_col== no_cols){
      current_row++
      current_col=0
    }
   
  }

}


//  this method stop exection with the given amount of time passed
const waitFor= async(time)=>{
  return new Promise((resolve,reject)=>{
    timeout = setTimeout(function(){
      resolve();
    },time)
  })
}