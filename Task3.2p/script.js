function showForm() {
    
    document.getElementById("form-container").style.display = "block";
}

document.addEventListener('DOMContentLoaded', function () {
    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns, {
        constrainWidth: false, 
        coverTrigger: false    
    });
});
