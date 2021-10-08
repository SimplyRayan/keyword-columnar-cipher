// map current indices to their true index
const map_indexes = (key)=>{
  arr_key = key.toUpperCase().split('') // convert key string to array

  // store key letters in an object with their current indices, so that we can access them later and not lose them
  arr_key = arr_key.map((el,index)=>{
  return {
  letter:el,
  orignal_index:index}

  })

  // Sorting KEYWORD letters alphabetically
  for (i = 1; i < arr_key.length; i++)
      { 
          current = arr_key[i]; 
          j = i - 1; 
          while (j >= 0 && arr_key[j].letter > current.letter)
          { 
              arr_key[j + 1] = arr_key[j]; 
              j = j - 1; 
          } 
          arr_key[j + 1] = current; 
      }   
  return arr_key
  }

// ##################################################################################### //\

// this method calculates info such as # of rows and columns also # of letters in the partial row if exist 
const calcMatrixInfo = (text,key)=>{

  text = text.replace(/ /g, "") // remove spaces  

  const no_cols = key.length // calculate number of columns based on the key length
  const no_rows = Math.ceil(text.length / no_cols) // calculate number of rows

  const rem =  text.length  % no_cols  // calculate number of letters in the last row (partial row) if any
  const has_rem = rem != 0 // whether there is a partail row or not

  const idx_map = map_indexes(key) // key index mapping in alphabetical order

  const text_array = text.toUpperCase().split('') // convert string to array

  return { no_cols, no_rows, rem, has_rem, text_array, idx_map }
}

// ##################################################################################### //


const validaitKey =  key =>{
  if( !key.match(/^[A-Za-z]+$/) ) // key must consist of only letters
    return false;
  else 
    return true
}

// ##################################################################################### //
const encrypt= (p,key) =>{

  if( !validaitKey(key) )
    throw new Error('Key must contain only letters')

  const { no_cols, no_rows, rem, has_rem, idx_map ,text_array } = calcMatrixInfo(p,key)
  
  const plain_arr = text_array;
  let cipher = ""

  // iterate through columns 
  for(let col=0; col<no_cols;col++){
      for(let row = 0 ; row<no_rows;row++){
      
      if( row+1==no_rows && has_rem  && idx_map[col].orignal_index>=rem )  // whether to skip the last row (partial row) if exist 
        break;
        
        cipher += plain_arr[row*no_cols+idx_map[col].orignal_index] // concatenate letters based on their order specifed by the key
    }
  }
  return cipher
}
  
// ##################################################################################### //

const decrypt= (c,key) =>{

  if( !validaitKey(key) )
    throw new Error('Key must contain only letters')
  
  const { no_cols, no_rows, rem, has_rem, idx_map, text_array} = calcMatrixInfo(c,key)

  const cipher_arr = text_array

  const plain_arr = [] // an array that will be filled with the plain text letters
  let current_letter= 0 // keep track of the current cipher letter

    // iterate through columns 
    for(let col=0; col<no_cols;col++){
       for(let row = 0 ; row<no_rows;row++){
      
        if( row+1==no_rows && has_rem && idx_map[col].orignal_index>=rem) // whether to skip the last row (partial row) if exist 
          break;

          plain_arr[row*no_cols+idx_map[col].orignal_index] = cipher_arr[current_letter++] // fill the matrix with letters in the order specified by the key
      }
    }

    return plain_arr.join('') // convert the matrix back to string after the letters were added to their correct coordinates

  }