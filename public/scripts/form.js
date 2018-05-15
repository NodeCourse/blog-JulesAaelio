let form = document.querySelector('form');
const fields = document.querySelectorAll("input:not([type='submit']),textarea");
if(form) {
    form.addEventListener('submit',(e) =>{
        for(let i = 0; i < fields.length; i++) {
            if(!fields[i].value) {
                fields[i].classList.add('validate','invalid');
                e.preventDefault();
            }else {
                fields[i].classList.remove('invalid');
            }
    }});
}
