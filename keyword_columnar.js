// map current indeices to their true index
const map_indexes = (key)=>{
  arr_key = key.split('')
  

  arr_key = arr_key.map((el,index)=>{
  return {
  value:el,
  orignal_index:index}
  })
  
  // Sorting
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
  idx_map = map_indexes(key)
  p = p.replace(/ /g, "");
  
  plain_arr = p.split('')
  
  const no_cols = idx_map.length
  const no_rows = Math.ceil(plain_arr.length / no_cols) 
  const rem =  plain_arr.length  % no_cols
  const has_rem = rem != 0
  
  CIPHER = ""
  
    for(let col=0; col<no_cols;col++){
       for(let row = 0 ; row<no_rows;row++){
       
        if(has_rem && row+1==no_rows && idx_map[col].orignal_index>=rem)    
          break;
        
         CIPHER += plain_arr[row*no_cols+idx_map[col].orignal_index]
      }
    }
    return CIPHER
  }
  
  
  const decrypt= (c,key) =>{
  idx_map = map_indexes(key)
  c = c.replace(/ /g, "");
  cipher_arr = c.split('')
  
  const no_cols = idx_map.length
  const no_rows = Math.ceil(cipher_arr.length / no_cols) 
  const rem =  cipher_arr.length  % no_cols
  const has_rem = rem != 0
  
  plain_arr = []
  let current_letter= 0 
  
    for(let col=0; col<no_cols;col++){
       for(let row = 0 ; row<no_rows;row++){
       
        if(has_rem && row+1==no_rows && idx_map[col].orignal_index>=rem)
          break;
         plain_arr[row*no_cols+idx_map[col].orignal_index] = cipher_arr[current_letter++]
      }
    }

    return plain_arr.join('')
  }
  
  result = encrypt('THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG','CORNELL')
  
  console.log(result=='TKODEGUWMRYINPTDCFEHOQOUEZHBXOLERJVA')
  
  result = decrypt('TKODEGUWMRYINPTDCFEHOQOUEZHBXOLERJVA','CORNELL')
  
  console.log(result=='THEQUICKBROWNFOXJUMPEDOVERTHELAZYDOG')
  
  
  