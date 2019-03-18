function removeAdverseEffect(id) {
    $(`#${id}`).remove();
}

function InmunizationBackground(code) {
    this.modal = $("#myModal")[0];
    this.component = $(`#${code}`);
    Background.call(this, code);
    // en este lugar se guardan los diagnosticos que se ingresen 
    this.diagnostics = [];
    //inicializacion 
    this.initBackground();
    //contador para las copias
    this.count = 0;
   
}
// herencia del prototipo de la clase padre
InmunizationBackground.prototype = Object.create(Background.prototype);
InmunizationBackground.prototype.constructor = InmunizationBackground;

//metodos
InmunizationBackground.prototype.initBackground = function() {
    // listener para el area expandible
    this.control.querySelectorAll('[data-activate]').forEach(function(control) {
        if (control.nodeName === "SELECT") {
            control.addEventListener('change', this.activateSelect.bind(this));
        } else {
            control.addEventListener('click', this.activateTB.bind(this));
        }
    }, this);

    $(this.component).find('#addAdverseEffectButton').on('click',this.AddAdverseEffect.bind(this));

    this.control.querySelectorAll(".group-data-inmune label").forEach(function(control) {
        control.addEventListener('click', this.populateModal.bind(this));
        control.onmouseover = this.onOverCell.bind(this);
        control.onmouseleave = this.onLeaveCell.bind(this);
        control.classList.add(`${control.dataset.estado}`);
    },this)

    this.control.querySelectorAll("#close-inmuno").forEach(function(control) {
        control.addEventListener('click', this.deletePosology.bind(this));
    },this)

    this.control.querySelectorAll("#save-inmuno").forEach(function(control) {
        control.addEventListener('click', this.savePosology.bind(this));
    },this)
};
InmunizationBackground.prototype.onOverCell = function(e){
   
    $(`[data-code=${e.target.dataset.codevacuna}]`).css({'background-color':'#93b74b','color':'#dee2e6'})
    $(`[data-code=${e.target.dataset.title}]`).css({'background-color':'#93b74b','color':'#dee2e6'})
   
}
InmunizationBackground.prototype.onLeaveCell = function(e){
   
    $(`[data-code=${e.target.dataset.codevacuna}]`).css({'background-color':'#dee2e6','color':'#4d4d4d'})
    $(`[data-code=${e.target.dataset.title}]`).css({'background-color':'#dee2e6','color':'#4d4d4d'})
    
}

InmunizationBackground.prototype.setEstateColor = function(vaccine,estate)
{
    this.control.querySelectorAll(`.group-data-inmune label[data-codeVacuna=${vaccine}]`).forEach(function(control) {
        control.dataset.estado = estate;
        control.classList = [];
        control.classList.add(estate);
    },this)
}
InmunizationBackground.prototype.deletePosology = function () {
    var codeDosis = $("#inmuno-dose").find(`select`).val();
    var Label = $(`[data-codeVacuna=${this.modal.dataset.codevacuna}][data-dosis=${codeDosis}]`)[0];
    if (Label != null) {
        this.setEstateColor(this.modal.dataset.codevacuna, 'IN');
        Label.innerText = "";
        Label.dataset.estado = "";
        Label.dataset.observaciones = "";
        Label.dataset.vacunador = "";
        Label.dataset.fecha = "";
        this.clearModal();
    }
    this.modal.style.display ="none";
}

InmunizationBackground.prototype.clearModal = function()
{
    $("#inmuno-estate").find(`select`).val([]);
    $("#inmuno-Observations").val("");
    $("#inmuno-date").find('input').val("");
    $("#inmuno-vacunator").find('input').val("");
}

InmunizationBackground.prototype.activateSelect = function (control) {
    if (control.value !== '') {
        control.classList.add('active');
    } else {
        control.classList.remove('active');
    }
}

InmunizationBackground.prototype.activateTB = function (control) {
    if (control.value != null && control.value != "") {
        control.classList.add('active');
    } else {
        control.classList.remove('active');
    }
}

InmunizationBackground.prototype.savePosology = function () {

    this.controls.forEach(function (item) {
        if (item.id.indexOf('-') > 0 && item.id.split('-')[0] == "inmuno") {
            item.validate;
        }
    });
            isvalid = false;
            this.controls.forEach(function (item) {
                if (item.id.indexOf('-') > 0 && item.id.split('-')[0] == "inmuno") {
                    if (!isvalid) {
                        item.parentControl.classList.add('show-alert')
                        var alert = item.parentControl.querySelector('.scse-alert');
                        item.message = "completa este campo"
	                    alert.dataset.message = item.message;
                      }
                    else {
                        item.parentControl.classList.remove('show-alert')
                        item.message ="";
                    }
                    isvalid = isvalid & item.Valid;
                }});

    var dosis = $("#inmuno-dose").find(`select option[selected="selected"]`)[0].innerText
    var estado = $("#inmuno-estate").find(`select`).val();
    var observaciones = $("#inmuno-Observations").val();
    var fecha = $("#inmuno-date input").val();
    var vacunador = $("#inmuno-vacunator").find('input').val();
    if (isvalid)
    // if(dosis != "v1" && estado != "v1" && observaciones != ""  && fecha != "" && vacunador != "" )
    {
     
        var Label = $(`[data-codeVacuna=${this.modal.dataset.codevacuna}][data-dosis=${dosis}]`)[0];
        if (Label == null) { alert('La dosis que esta intentando ingresar no existe para la vacuna') }
        else {
            Label.innerText = dosis;
            Label.dataset.estado = $("#inmuno-estate").find(`select`).val();
            Label.dataset.observaciones = $("#inmuno-Observations").val();
            Label.dataset.fecha = $("#inmuno-date").find('input').val();
            Label.dataset.vacunador = $("#inmuno-vacunator").find('input').val();
            this.clearModal();
            this.setEstateColor(this.modal.dataset.codevacuna, Label.dataset.estado);
            this.modal.style.display = "none";
        }
    }
    else{
     
    }
};
InmunizationBackground.prototype.populateModal = function(e){
   this.modal.dataset.open=e.target.id;
   this.modal.dataset.codevacuna = e.target.dataset.codevacuna;
    $('#vaccine-title')[0].textContent = e.target.dataset.vacuna;

    if(e.target.dataset.estado != ""){
         $(this.modal).find('#inmuno-estate select').val(`${e.target.dataset.estado}`)
        $("#inmuno-estate").find(`select option[value='${e.target.dataset.estado}']`).attr('selected',true)
    }
    if(e.target.dataset.observaciones != ""){
        $("#inmuno-Observations").val(`${e.target.dataset.observaciones}`)
    }
    if(e.target.dataset.fecha != ""){
        $("#inmuno-date").find('input').val(`${e.target.dataset.fecha}`)
    }
    if(e.target.dataset.dosis != ""){
        $("#inmuno-dose").find(`select`).val([]);
        $(this.modal).find('#inmuno-dose select').val(`${e.target.dataset.dosis}`)
        $("#inmuno-dose").find(`select option[value='${e.target.dataset.dosis}']`).attr('selected',true)
        }
    if(e.target.dataset.vacunador != ""){
        $("#inmuno-vacunator").find('input').val(`${e.target.dataset.vacunador}`)
    }

    $(this.modal).find('select').change(function (e) {
        control = e.target;
        if (control.value != null && control.value != "") {
            control.classList.add('active');
        } else {
            control.classList.remove('active');
        }
    });



    this.modal.style.display ="block";
};
InmunizationBackground.prototype.AddAdverseEffect = function() {
    
    var effect = $(this.component).find('#inm_eas select').val()
    var vaccine = $(this.component).find('#inm_vac select').val()
    var date = $(this.component).find('#inm_fde input').val()
    var Observations = $(this.component).find('#inm_oea').val()
     if(effect!="v1" && vaccine !="v1" && date !="" && Observations!="" && Observations!=null){
    // crear el objeto html
    var $contenedor = $(`<div class="row mx-1" id="inm-adverseEffect-${effect.replace(' ', '_')}" data-IsEditable="true"></div>`);
    var $coleffect = $(`<div class="col-3"><div id="inm-ea-${effect}" class="scse-ce-form" data-type="L"> <input class="inputBLine col-12 fields" type="text" value="${effect}" readonly /></div></div>`);
    var $colvaccine = $(`<div class="col-3"><div id="inm-vac-${vaccine}" class="scse-ce-form" data-type="L"> <input class="inputBLine col-12 fields" type="text" value="${vaccine}" readonly /></div></div>`);
    var $coldate = $(`<div class="col-2"><div id="inm-fea-${date}" class="scse-ce-form" data-type="L"> <input class="inputBLine col-12 fields" type="text" value="${date}" readonly /></div></div>`);
    var $colObservations = $(`<div class="col-3"><div id="inm-oea-${Observations}" class="scse-ce-form" data-type="L"> <input class="inputBLine col-12 fields" type="text" value="${Observations}" readonly /></div></div>`);
    
    var $colbutton = $(`<div class="col-1"> <button class="backgroundsCommonBtn delete" type="button" onclick="removeAdverseEffect('inm-adverseEffect-${effect.replace(' ', '_')}')"><i class="fa fa-times" aria-hidden="true"></i> </button></div>`);

    // agregar nuevo row al contenedor 
    $contenedor.append($coleffect);
    $contenedor.append($colvaccine);
    $contenedor.append($coldate);
    $contenedor.append($colObservations);
    $contenedor.append($colbutton);
    $(this.component).find('#adverseEffectContainer')[0].append($contenedor[0])
    // limpiar los campos
    $(this.component).find('#inm_eas select').val([])
    $(this.component).find('#inm_vac select').val([])
    $(this.component).find('#inm_fde input').val("");
    $(this.component).find('#inm_oea').val("");
}
};
