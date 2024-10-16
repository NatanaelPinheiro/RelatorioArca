const mainForm = document.getElementById("mainForm");
const daysOfWeek = [
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
    "domingo"
];

const fieldSufix = [
    "_horario",
    "_culto",
    "_pregador",
    "_dirigente"
];

let fields;

daysOfWeek.forEach((day) => {
    fields 
    fieldSufix.forEach((sufix) => {
        fieldName = day + sufix;
        let field = document.getElementById(fieldName);
        if(field){
            field.style.display = 'none';
        }
    });

    let dayAvailability = document.getElementById(day + "_disponibilidade");
    if(dayAvailability){
        dayAvailability.addEventListener('change', handleSelectChange)
    }
});

function handleSelectChange(event){
    let day = event.target.id.split('_')[0];
    if(day){
        fieldSufix.forEach((sufix) => {
            fieldName = day + sufix;
            let field = document.getElementById(fieldName);
            if(field){
                let att = document.createAttribute('required');
                att.value = true;
                if(event.target.value == 'culto'){
                    field.style.display = 'block';
                    field.setAttributeNode(att);
                }else{
                    if(field.hasAttribute('required')){
                        field.required = false
                    }
                    field.style.display = 'none';
                }
            }
        });
    }
}

mainForm.addEventListener('submit', handleMainFromSubmit);

function handleMainFromSubmit(evt){
    evt.preventDefault();
    let string = "RELAÓRIO DA SEMANA\n\n";
    daysOfWeek.forEach((day) => {
        let dayAvailability = document.getElementById(day + "_disponibilidade").value;
        if(dayAvailability == 'culto'){
            string += `*${day.toUpperCase()}*`;
            fieldSufix.forEach((sufix) => {
                fieldName = day + sufix;
                let fieldValue = document.getElementById(fieldName).value;
                let sufixClenan = sufix.replace("_", " ").trim();
                string += `\n*${sufixClenan}*: ${fieldValue}`;
            })
            string +='\n\n'
        }
    });
    let confirm = window.confirm('certeza que deseja enviar relatório?');
    if(confirm){
        return window.location.href = `https://wa.me/5585991864955?text=${encodeURIComponent(string)}`;
    }
  
}
