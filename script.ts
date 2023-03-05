const month_card:HTMLInputElement | null = document.querySelector('.month_card'),
number_card = document.querySelector<HTMLElement>('#number_card'),
card_number_input = document.querySelector<HTMLInputElement>('#card_number_input'),
card_name: HTMLInputElement | null = document.querySelector('#card_name'),
firstName: HTMLElement | null = document.querySelector('.firstName'),
wrong_letter: HTMLElement | null = document.querySelector('.wrong_letter'),
wrong_number: Element | null = document.querySelector('.wrong_number'),
wrong_cvc: HTMLElement | null = document.querySelector('.wrong_cvc'),
box_firstname:HTMLElement | null = document.querySelector('.box_firstname'),
year_card:HTMLInputElement | null = document.querySelector('.year_card'),
year_display_card: HTMLElement | null = document.querySelector('.year'),
cvc: HTMLElement | null = document.querySelector('.cvc'),
month_display_card: HTMLElement | null = document.querySelector('.month'),
check_form: Element | null = document.querySelector('.check_form'),
cvc_number:HTMLElement | null = document.querySelector('.cvc_number'),
month_error:HTMLElement | null = document.querySelector('.month_error'),
year_error:HTMLElement | null = document.querySelector('.year_error'),
btn_confirm:HTMLElement | null = document.querySelector('.btn_confirm'),
form_for_card:HTMLElement | null = document.querySelector('.form_for_card');

//Create any balises with the function createElement for addEventListener submit the form
let create_bloc: HTMLDivElement = document.createElement('div'),
create_bloc_for_round_and_title: HTMLDivElement = document.createElement('div'),
create_circle: HTMLDivElement = document.createElement('div'),
create_check: HTMLElement = document.createElement('i'),
create_title: HTMLDivElement = document.createElement('h3'),
add_details: HTMLDivElement = document.createElement('p'),
inputBtn:HTMLInputElement = document.createElement('input')

let display_on_card:any,
display_expiration_date,
regex_name:RegExp =/^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/,
regex_number:RegExp = /^[0-9]+$/,
quantity_two:RegExp = /^\d{1,2}$/,
firstNameOrNumbeCard:Boolean,
stack_number_card:string,
target_Number, type_on_input,wrong_letter_html
let storage_in_obj;

interface data_card {
  number_card: string | HTMLElement | null,
  name_card: string | HTMLElement | null,
  month_exp: number,
  year_exp: number,
  cvc_exp: number
}

let obj_card:data_card = {
  number_card: '',
  name_card: '',
  month_exp: 0,
  year_exp: 0,
  cvc_exp: 0
}
// let obj_card:data_card = {
//   number_card: '1234 5678 9123 000',
//   name_card: 'FELICIA LEIRE',
//   month_exp: 3,
//   year_exp: 23,
//   cvc_exp: 123
// }


/**
 * Create function global for number card and the name on the card (recto)
 * @param event 
 * @param type_regex 
 * @param booleanElement 
 * @param element_input 
 * @param error_input 
 */
const global_input = (event:Event,type_regex:RegExp,booleanElement:Boolean,element_input:HTMLElement | null, error_input: Element| null):void =>{
 type_on_input = event.currentTarget as HTMLInputElement;
display_on_card = element_input?.innerHTML as string; 

if(type_regex.test(type_on_input.value)){
  if(element_input){
  firstNameOrNumbeCard= booleanElement;
   element_input.innerHTML = firstNameOrNumbeCard ? `<h2 class='firstName'>${type_on_input.value.toUpperCase().slice(0,22)}</h2>` : type_on_input.value.replace(/(\d{4})/g, "$1 ");
 storage_in_obj =  firstNameOrNumbeCard ? obj_card.name_card = type_on_input.value : obj_card.number_card = type_on_input.value

 if(error_input instanceof Element)
   error_input.className = 'hidden' ;
}}

else {
 if(error_input instanceof HTMLElement) {
   if(error_input instanceof HTMLElement){
      error_input.className = "text-red-600"
     error_input.innerHTML = "Wrong format, letter only"
}
  };
}
}
/**
 * Add firstname and lastname on the card(recto)
 */
card_name?.addEventListener('input',(event)=> {
  global_input(event, regex_name, true, firstName, wrong_letter)
//  console.log('name ' + storage_in_obj);
 
  
  if(type_on_input.value.toUpperCase().length > 22 ){
    if(wrong_letter instanceof HTMLElement){
      wrong_letter.className = "text-orange-400";
     wrong_letter.innerHTML = "16 characters minimum"
}
  }
}
)


/**
 * Add the number on the card(recto)
 */
card_number_input?.addEventListener('input',(event)=>{
  global_input(event,regex_number, false, number_card, wrong_number)
  //  console.log('number ' + storage_in_obj);
})

/**
 * Display the expiration date on the carte (recto)
 * @param event 
 * @param getMonthOrYear 
 * @param displayMonthOrYear 
 * @param err_element 
 * @param getYear 
 */
const expiration_date = (event:Event,getMonthOrYear:any, displayMonthOrYear:HTMLElement | null | number, err_element:HTMLElement | null, getYear: any ) =>{
target_Number = event.currentTarget as HTMLInputElement;
if(getMonthOrYear <= +target_Number.value && target_Number.value.length <= 2 || target_Number.value  === "1"   ){
if ( displayMonthOrYear instanceof HTMLElement) displayMonthOrYear.innerHTML = target_Number.value;
obj_card.month_exp = +target_Number.value

  if( err_element instanceof HTMLElement) err_element.className = 'flex hidden';
}

else if(+target_Number.value.length > 2 || +target_Number.value === 0 || target_Number.value < getYear|| +target_Number.value > 12){
  if( err_element instanceof HTMLElement){
  err_element.className = 'flex text-red-600';
    err_element.innerHTML = "Can't be blank";
  }
}
//TODO: fais par chatpgt
let date = new Date();
let mois = date.getMonth() + 1;
let annee = date.getFullYear();
let dateFormate = mois + "/" + annee;
console.log(dateFormate);
 
}
 /**
  * Display the month on the card (recto)
  */
month_card?.addEventListener('change',(event)=> {
  expiration_date(event, Number(String(new Date().getMonth())), month_display_card, month_error, null)
obj_card.month_exp




})


 /**
  * Display the year on the card (recto)
  */
year_card?.addEventListener('change',(event)=> {
  expiration_date(event, Number(String(new Date().getFullYear()).slice(2,4)),  year_display_card, year_error,Number(String(new Date().getFullYear()).slice(2,4)) )
obj_card.month_exp

  if(target_Number.value  === "1" ){
  if( year_error instanceof HTMLElement){
  year_error.className = 'flex text-red-600';
    year_error.innerHTML = "Can't be blank";
  }
}
})




/**
 * Display the number CVC on the card (verso)
 */
cvc_number?.addEventListener('input',(e)=>{
target_Number = e.currentTarget as HTMLInputElement;
if(target_Number.value.length < 3){
  if( wrong_cvc && cvc instanceof HTMLElement){
 wrong_cvc.className = 'flex text-red-600';
    cvc.innerHTML =target_Number.value;
  }
}
else if(regex_number.test(target_Number.value )){
if(cvc){
    wrong_cvc?.classList.add('hidden') ;
    cvc.innerHTML =target_Number.value;
    obj_card.cvc_exp = target_Number.value

    
    
    
  }}
})


check_form?.addEventListener('submit',(e:Event)=>{
e.preventDefault()
console.log(obj_card);
//Remove the form 

//Add any balises in the DOM
form_for_card?.append(create_bloc)
create_bloc.append(create_bloc_for_round_and_title)
create_bloc_for_round_and_title.append(create_circle,create_title )
create_circle.append(create_check)
create_bloc.append(add_details, inputBtn)
console.log(!obj_card.number_card || !obj_card.name_card || !obj_card.month_exp || !obj_card.cvc_exp || !obj_card.year_exp );


if(obj_card.number_card === '' || obj_card.name_card ==="" || !obj_card.month_exp || !obj_card.cvc_exp || !obj_card.year_exp ){
confirm('Veuillez remplir correctement le formulaire !')

}else{
  check_form.remove()
  //Create className for element from DOM
create_bloc.className = 'text-center flex flex-col justify-center mt-8 space-y-6 w-[36em]';
create_bloc_for_round_and_title.className = 'text-center flex flex-col justify-center space-y-6';
create_circle.className = 'bg-gradient-to-t from-blue-600 to-purple-700 h-[2.5em] w-[2.5em] rounded-full p-10 mx-auto mt-4';
create_check.className = 'text-center fa-solid fa-check text-white text-3xl flex justify-center align-center -mt-4';
create_title.className = 'uppercase text-4xl font-bold mt-12';
add_details.className = 'text-lg text-slate-400';
inputBtn.className = 'btn_confirm bg-slate-900 text-white rounded-md h-12 px-12 w-full mx-auto lg:mt-12'

  //Add any attributs and innerHTML
  create_title.innerHTML = "Thank you!"
  add_details.innerHTML = "We ve added your card details"
  inputBtn.setAttribute('type', 'submit');
  inputBtn.setAttribute('value', 'Confirm');
}

})












