// map current indices to their true index
const map_indexes = (key)=>{
  arr_key = key.toUpperCase().split('') // remove spcaes 


  // store key letters in an object with their current indices, so that we can access them later and not lose them
  arr_key = arr_key.map((el,index)=>{
  return {
  value:el,
  orignal_index:index}
  })
  
  // Sorting KEYWORD letters alphabetically
  for (i = 1; i < arr_key.length; i++)
      { 
          current = arr_key[i]; 
          j = i - 1; 
          while (j >= 0 && arr_key[j].value > current.value)
          { 
              arr_key[j + 1] = arr_key[j]; 
              j = j - 1; 
          } 
          arr_key[j + 1] = current; 
      } 
  
  return arr_key
  }
  
  

const encrypt= (p,key) =>{

  idx_map = map_indexes(key) // get key index mapping in alphabetical order
  p = p.replace(/ /g, ""); // remove spaces
  
  plain_arr = p.toUpperCase().split('') // convert string to array
  
  const no_cols = idx_map.length // calculate number of columns based on the key length
  const no_rows = Math.ceil(plain_arr.length / no_cols) // calculate number of rows

  const rem =  plain_arr.length  % no_cols  // calculate number of letters in the last row (partial row) if any
  const has_rem = rem != 0 // whether there is a partail row or not
  
  CIPHER = ""
    
  // iterate through columns 
  for(let col=0; col<no_cols;col++){
      for(let row = 0 ; row<no_rows;row++){
      
      if(row+1==no_rows && has_rem  && idx_map[col].orignal_index>=rem)  // whether to skip the last row (partial row) if exist 
        break;
      
        CIPHER += plain_arr[row*no_cols+idx_map[col].orignal_index] // concatenate letters based on their order specifed by the key
    }
  }
  return CIPHER
}
  

const decrypt= (c,key) =>{

  idx_map = map_indexes(key) // get key index mapping in alphabetical order
  c = c.replace(/ /g, ""); // remove spaces

  cipher_arr = c.toUpperCase().split('') // convert string to array
  
  const no_cols = idx_map.length // calculate number of columns based on the key length
  const no_rows = Math.ceil(cipher_arr.length / no_cols)  // calculate number of rows

  const rem =  cipher_arr.length  % no_cols // calculate number of letters in the last row (partial row) if any
  const has_rem = rem != 0 // whether there is a partail row or not

  PLAIN_ARR = [] // an array that will be filled with the cipher letters

  let current_letter= 0 // keep track of the current cipher letter

    // iterate through columns 
    for(let col=0; col<no_cols;col++){
       for(let row = 0 ; row<no_rows;row++){
      
        if(has_rem && row+1==no_rows && idx_map[col].orignal_index>=rem) // whether to skip the last row (partial row) if exist 
          break;

        PLAIN_ARR[row*no_cols+idx_map[col].orignal_index] = cipher_arr[current_letter++] // fill the matrix with letters in the order specified by the key
      }
    }

    return PLAIN_ARR.join('') // convert the matrix back to string after the letters were added to their correct coordinates
  }
  

  result = encrypt('THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG','CORNELL')
  
  console.log(result=='TKODEGUWMRYINPTDCFEHOQOUEZHBXOLERJVA')
  
  result = decrypt('TKODEGUWMRYINPTDCFEHOQOUEZHBXOLERJVA','CORNELL')
  
  console.log(result=='THEQUICKBROWNFOXJUMPEDOVERTHELAZYDOG')  