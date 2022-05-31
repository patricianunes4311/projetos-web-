console.log("Minha console está funcionando");
const checkForm= {
    productName: false,   
    productDescription:false,
    productPrice:false,
    urlProductImage:false
}

document.getElementById('productName').addEventListener('input', function (e) {
    console.log(checkForm);
    const productName = e.target.value;
    // Quero verificar se o tamanho do nome do produto que o usuÃ¡rio digitou Ã© maior que 50. 
    // Se for maior que 50 mostra a mensagem de erro. 
    if(productName.length > 50){
        console.log('O nome do produto deve ter no máximo 50 caracteres');
        document.getElementById("productName-error").style.display = "block";
        checkForm.productName = false;
    } else {
        document.getElementById("productName-error").style.display = "none";
        checkForm.productName = true;
    }
    enableButton();
});

document.getElementById('productDescription').addEventListener('input', function(e) {
    console.log(checkForm);
    const productDescription = e.target.value;
    console.log(productDescription);
    if(productDescription.length > 200 || productDescription.length < 5){
        console.log("Descrição do produto deve ter entre 5 e 200 caracteres");
        document.getElementById('productDescription-error').style.display = 'block';
        checkForm.productDescription = false;
    } else {
        document.getElementById('productDescription-error').style.display = 'none';
        checkForm.productDescription = true;
    }
    enableButton();
});

document.getElementById('productPrice').addEventListener('input', function(e) {
    console.log(checkForm);
    console.log('Monitorando o preÃ§o do produto');
    const productPrice = e.target.value;
    console.log(productPrice);
    if(isNaN(productPrice)){
        document.getElementById('productprice-error').style.display = 'block';
        checkForm.productPrice = false;
    } else {
        document.getElementById('productprice-error').style.display = 'none';
        checkForm.productPrice = true;
    }
    enableButton();
});

document.getElementById('urlProductImage').addEventListener('input', function(e) {
    console.log(checkForm);
    console.log('Monitorando url');
    const urlProductImage = e.target.value;
    if(validURL(urlProductImage)){
        console.log('A imagem deve ser uma url');
        document.getElementById('urlProductImage-error').style.display = 'block';
        checkForm.urlProductImage = false;
    } else {
        document.getElementById('urlProductImage-error').style.display = 'none';
        checkForm.urlProductImage = true;        
    }
    enableButton();

});

function validURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !pattern.test(str);
  }
  function enableButton(){
      const button = document.getElementById("button");
      if(checkForm.productName && checkForm.productPrice && checkForm.productDescription && checkForm.urlProductImage){
          button.disabled = false;
      }else{
          button.disabled = true;
      }
      console.log (checkForm);
  }
    // criar cards no js 

  const showproducts = (products) => {
      console.log (products);

    //repetir o processo dos cards 
    for (let i=0; i < products.length; i ++){   //i ++ imcrementar cada vez mais um 
        console.log (products[i].productName) //valores da variável sempre vão ficar em colchetes 

        let tagDivCard = document.createElement ('div'); // para criar um elemento
        tagDivCard.setAttribute ('class','card mx-auto','mb-2') // definindo os atributos 
        tagDivCard.setAttribute ('style','width:300px;');

        let tagImage = document.createElement ('img');
        tagImage.setAttribute('class','card-img-top');
        tagImage.setAttribute ('src',products[i].urlProductImage); //definindo a imagem que está no banco  de dados 
        tagImage.setAttribute ('alt',products[i].productName);

        tagDivCard.appendChild(tagImage); // criando um filho para a div card 

         let tagDivCardBody= document.createElement('div');
         tagDivCardBody.setAttribute('class','card-bory');
         tagDivCard.appendChild(tagDivCardBody);

         let tagH5 =document.createElement('h5');
         tagH5.setAttribute('class','text-center');
          let textNode = document.createTextNode(products[i].productName);
          tagH5.appendChild(textNode);
          tagDivCardBody.appendChild(tagH5);
 
          let tagH6 =document.createElement('h5');
          tagH6.setAttribute('class','text-center');
           textNode = document.createTextNode(products[i].productCategory); //não foi criada outra tag text node porque ela já foi criada 
           tagH6.appendChild(textNode);
           tagDivCardBody.appendChild(tagH6);

           let tagP = document.createElement ('p');
           tagP.setAttribute('class','card-text text-center');
           textNode = document.createTextNode(products[i].productDescription);
           tagP.appendChild(textNode);
           tagDivCardBody.appendChild(tagP);

           tagP = document.createElement ('p');
           tagP.setAttribute('class','text-center price');
           textNode = document.createTextNode(products[i].productPrice);
           tagP.appendChild(textNode);
           tagDivCardBody.appendChild(tagP);

           tagA = document.createElement('a');
           tagA.setAttribute('class','btn btn-primary mx-auto');
           tagA.setAttribute('href','#');
           tagA.setAttribute('style','width:100%');
           textNode = document.createTextNode('Adicionar ao carrinho');
           tagA.appendChild(textNode);
           tagDivCardBody.appendChild(tagA);

           let divPrincipal = document.getElementById('divPrincipal');
           divPrincipal.appendChild(tagDivCard);


                   //não precisa estar na ordem do formulário, mas também podemos por 
        
    }
  }
  
  
  //buscar produtos no banco de dados 
    const fetchProducts =  () => {
      console.log("Cheguei na script para carregar os produtos");
      //carregar os produtos no banco de dados
      //endereço da api http://localhost:8000/GETProducts.php

      fetch('http://localhost:8000/getproducts.php')
      .then((response)=>{
          if(response.status >= 200 && response.status < 300 ){
              console.log(response);
              return response.json()
          }
          // mensagem de erro 
          throw new Error (response.statusText);
      })
      .then((products) => {
          showproducts(products);
      } )
      .catch((error)=>{
          console.log(error);
      })
  }

  


