const addSpace = (str,len=5)=>{
  return [...str].map((charachter, idx) => (idx) % len == 0 ? ' ' + charachter : charachter).join('').trim()
}

const app = Vue.createApp({
  data(){
    return {
      text:'THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG ',
      keyword:'CORNELL',
      method:'encrypt',
      // 
      showSteps:false,
      matrix_info:{},
      visual_array : [] , 
      keyword_array :[]
    }
  },
  computed:{
    result(){

      validity = this.checkValidity()
      if(validity){
        return validity
      }

      if(this.method=='encrypt'){
         // this call can throw an error if the text had characthers other than letters
         // but since we checked for that earlier there is no need to wrap it in try .. catch
        value = encrypt(this.text,this.keyword)
        value = addSpace(value)
        return value

      }      
      else if (this.method=='decrypt'){
        // this call can throw an error if the text had characthers other than letters
         // but since we checked for that earlier there is no need to wrap it in try .. catch
        value = decrypt(this.text,this.keyword);
        value = addSpace(value)
        return value
      }
 
    }
  },
  methods:{
    // 
    checkValidity(){

      this.resetSteps() 

      if(this.text.length <1 || this.keyword.length <1)
        return 'Type Something';

      if(!this.keyword.match(/^[A-Za-z]+$/))
        return 'Keyword should only contain letters'

    },
    // 
    async visualize(){
      
      if(this.showSteps)
        return this.showSteps = false
        
      let validity = this.checkValidity()

      // if it has value this means there is an issue with teh validity of the text or the key, but if it's undefined --> it's OK
      if(validity) 
        return;
      
      this.showSteps = true 
      
      this.matrix_info = calcMatrixInfo(this.text,this.keyword)
      this.keyword_array = evaluate_keyword_indexes(this.matrix_info.idx_map, this.keyword)
      
      this.visual_array  =new Array(this.matrix_info.no_rows).fill('').map(() => new Array(this.matrix_info.no_cols).fill('')); // empty array to be filled with letters later

      if(this.method=='encrypt')
        await visualizeEncryption(this.matrix_info,this.visual_array,this.keyword_array)
            
      else if (this.method=='decrypt')
        await visualizeDecryption(this.matrix_info,this.visual_array,this.keyword_array);
    },
    // 
    resetSteps(){

      clearTimeout(timeout) // this clears the setTimeout used in the other function

      this.matrix_info={}
      this.visual_array = []
      this.keyword_array = []
      this.showSteps = false
    }
  }
})

app.mount('#app');