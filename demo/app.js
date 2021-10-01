
const app = Vue.createApp({
  data(){
    return {
      text:'',
      keyword:'',
      method:'encrypt',
      // 
      showSteps:false,
      matrix_info:{},
      array : [] , 
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
        return encrypt(this.text,this.keyword)
      }      
      else if (this.method=='decrypt'){
        return decrypt(this.text,this.keyword);
      }
 
    }
  },
  methods:{
    encryptText(){
      this.result = encrypt(this.text,this.keyword)
     
    },
    decryptText(){
      this.result = decrypt(this.text,this.keyword)
   
    },
    checkValidity(){
      this.resetSteps() 

      if(this.text.length <1 || this.keyword.length <1)
      return 'Type Something';

      if(!this.keyword.match(/^[A-Za-z]+$/))
        return 'Keyword should only contain letters'

    },
    async explain(){
      validity = this.checkValidity()
      if(validity)
        return;
      
      this.matrix_info = get_matrix_info(this.text,this.keyword)
      this.keyword_array = evaluate_keyword_indexes(this.matrix_info.idx_map,this.keyword)
    
      this.showSteps = true
      this.array  =new Array(matrix_info.no_rows).fill('-').map(() => new Array(matrix_info.no_cols).fill('-'));

      if(this.method=='encrypt')
        await explaineEncrypt(matrix_info,this.array,this.keyword_array)
            
      else if (this.method=='decrypt')
        await explaineDecrypt(matrix_info,this.array,this.keyword_array);
    },
    resetSteps(){

      clearTimeout(timeout) // this clears the setTimeout used in the other function

      this.matrix_info={}
      this.array = []
      this.showSteps = false
    }
  }
})

app.mount('#app');