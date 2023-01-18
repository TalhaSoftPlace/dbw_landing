export const filterElements = (elem, filter) => {

    const allOptions = document.getElementsByClassName(elem);

    for (var i = 0; i < allOptions.length; i++) {
        const currentOption = allOptions[i];
        if (filter === "") {
            currentOption.style.display = "block";
        } else if (currentOption.innerText.search(new RegExp(filter, "i")) < 0) {
            currentOption.style.display = "none";
        } else {
            currentOption.style.display = "block";
        }
    }

}