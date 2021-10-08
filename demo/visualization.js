// this file has many extra steps that are used in order to show the setps of the cipher,
// the file keyword_columnar.js is the file used solely to encrypt or decrypt 

timeout=null // used to clear the timeout when needed 

// this method maintains original array order (un-sorted) but with ture index values, as opposed to sorted array with original index values
// this is a bit of work but it would allow us to show the orignal key along with their true index
// example: key= CABD -- > (C,3) - (A,1) - (B-2) - (D-4) 
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
const visualizeEncryption = async (matrix_info,visual_array,keyword_array)=>{

  const {idx_map, no_cols, no_rows, rem, has_rem, text_array} = matrix_info // extract needed variables from the matrix_info object 
  const plain_arr = text_array

  let current_row = 0
  let current_col= 0
  //  WRITE HORIZONTALLY 
  for(i=0; i<text_array.length ; i++){

    await waitFor(400)

    visual_array[current_row][current_col] = {value:plain_arr[i],highlight:false}
    current_col++

    if(current_col== no_cols){
      current_row++
      current_col=0
    }

  }

  // HIGHLIGHT COLUMNS BY ORDER OF THE KEY
  for(let col=0; col<no_cols;col++){
      for(let row = 0 ; row<no_rows;row++){

      if(row+1==no_rows && has_rem  && idx_map[col].orignal_index>=rem)  // whether to skip the last row (partial row) if exist 
        break;
        

        visual_array[row][idx_map[col].orignal_index].highlight=true;
        keyword_array[idx_map[col].orignal_index].highlight =true

        await waitFor(400)

        visual_array[row][idx_map[col].orignal_index].highlight=false;
        keyword_array[idx_map[col].orignal_index].highlight =false
        
    }
  }
}

// shows how the decryption works
const visualizeDecryption = async(matrix_info,visual_array,keyword_array)=>{

  const {idx_map, no_cols, no_rows, rem, has_rem, text_array} = matrix_info
  const cipher_arr = text_array

  let current_letter= 0 // keep track of the current cipher letter
  // WRITE VERTICALLY 
  for(let col=0; col<no_cols;col++){
     for(let row = 0 ; row<no_rows;row++){
      
      if(has_rem && row+1==no_rows && idx_map[col].orignal_index>=rem) // whether to skip the last row (partial row) if exist 
        break;

        let value =  cipher_arr[current_letter++]

        // HIGHLIGHT KEYWORD
        visual_array[row][idx_map[col].orignal_index] = {value:value}
        keyword_array[idx_map[col].orignal_index].highlight = true

        await waitFor(400)

        keyword_array[idx_map[col].orignal_index].highlight = false
    }
  }

  let current_row = 0
  let current_col= 0
  
  // HIGHLIGHT MATRIX ITEMS
  for(i=0; i<text_array.length ; i++){

    visual_array[current_row][current_col].highlight = true

    await waitFor(400)
    
    visual_array[current_row][current_col].highlight = false
    current_col++

    if(current_col== no_cols){
      current_row++
      current_col=0
    }
   
  }

}


//  this method stop execution with the given amount of time passed
const waitFor= async(time)=>{
  return new Promise((resolve,reject)=>{
    timeout = setTimeout(function(){
      resolve();
    },time)
  })
}