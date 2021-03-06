// clase para antecedente de patologia 

function PathologicalBackground(code) {
    Background.call(this, code);
    // en este lugar se guardan los diagnosticos que se ingresen 
    this.diagnostics = [];
    //inicializacion 
    this.initBackground();
    //contador para las copias
    this.count = 0;
}
// herencia del prototipo de la clase padre
PathologicalBackground.prototype = Object.create(Background.prototype);
PathologicalBackground.prototype.constructor = PathologicalBackground;

//metodos
PathologicalBackground.prototype.initBackground = function() {
    // listener para el area expandible
    this.control.querySelector('#pa_back').querySelectorAll('[type="radio"]').forEach(function(radio) {
        radio.addEventListener('click', this.expandArea.bind(this))
    }, this);
    // listener para agregar un nuevo diagnostico
    this.control.querySelector('.plus-bottom').addEventListener('click', this.addDiagnostic.bind(this));
};

// expande el area de diagnosticos
PathologicalBackground.prototype.expandArea = function(e) {
    if (e.target.id === "pac_si") {
        this.control.querySelectorAll('[data-expand]').forEach(function(control) {
            control.classList.remove('hidden');
        })
    } else {
        this.control.querySelectorAll('[data-expand]').forEach(function(control) {
            control.classList.add('hidden');
        })
    }
};

// agraga un diagnostico
PathologicalBackground.prototype.addDiagnostic = function() {
    // se valdian los controles si no es valido no se agrega el diagnostico
    var next = true;
    this.controls.forEach(function(variable) {
        variable.validate();
        if (!variable.Valid) next = false;
    });
    if (!next) return;
    // control oculto que se clona
    var Control = this.control.querySelector('[data-clone]');
    // clone
    var ControlClone = Control.cloneNode(true);
    ControlClone.dataset.expand = "";
    ControlClone.classList.remove('hidden');
    Control.parentElement.appendChild(ControlClone);
    ControlClone.querySelector('.plus-bottom').addEventListener('click', this.removeDiagnostic.bind(this))
    ControlClone.querySelectorAll('[data-control-clone]').forEach(function(variable) {
        var controlid = variable.dataset.code;
        // deja de ser un clone
        delete variable.dataset.controlClone;
        variable.dataset.control = "";
        variable.id = 'pa_' + controlid + this.count;
        variable.dataset.code = 'pac_' + controlid + this.count;
        // seteo de valores y limpia las variables
        var backControl = this.createControlByType(variable.id, variable.dataset.type, variable.dataset.code, this.code);
        var varToSet = this.controls.find(v => v.id === 'pa_' + controlid);
        // el bacground control se encargadel set de cada control
        backControl.Value = varToSet.Value;
        varToSet.Value = null;
        this.controls.push(backControl);
    }, this);
    this.count++;
};
// borrado de diagnosticos 
PathologicalBackground.prototype.removeDiagnostic = function(e) {
    var parent = e.target.closest('[data-clone]');
    parent.querySelectorAll('[data-control]').forEach(function(control) {
        var variable = this.controls.find(v => v.code === control.dataset.code);
        if (variable) {
            var index = this.controls.indexOf(variable);
            delete this.controls[index];
            this.controls.splice(index, 1);
        }
    }, this);
    parent.remove();
};