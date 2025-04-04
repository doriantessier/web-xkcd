const XKCD = "https://xkcd.now.sh/?comic=";
const numElement = document.getElementById("num");
const reset = document.getElementById("reset");
const suivant = document.getElementById("next");
const precedent = document.getElementById("previous");

let current = 0;

// write your code here
const fetchIssue = (num) => {
    return fetch(XKCD + num)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Problem");
            }
        }).then((data) => {
            if (data) {
                console.log(`Image num: ${data.num}`);
                numElement.innerText = data.num;
                numElement.style.marginLeft = "45%"
                const imgElement = document.querySelector("img");
                imgElement.src = data.img;
                imgElement.alt = data.alt;
                imgElement.style.display = "block";
                imgElement.style.margin = "0 auto";
            }
        }).catch((error) => {
            console.error("Error fetching the comic:", error);
        });
}



//Change comic
const to_latest = () => {
    fetchIssue("latest");
    current = 3071
}

const next = () => {
    current ++;
    if (current == 3071) {
        fetchIssue("latest");
    }
    else {
        fetchIssue(current);
    }
}

const previous = () => {
    current --;
    if (current == 0) {
        fetchIssue("latest");
    }
    else{
        fetchIssue(current);
        }
}




//Control when buttons are able to be clicked or not
const updateNextButtonState = () => {
    if (current == 3071) {
        suivant.disabled = true;
    } else {
        suivant.disabled = false;
    }
};

const updatePreviousButtonState = () => {
    if (current == 1) {
        precedent.disabled = true;
    } else {
        precedent.disabled = false;
    }
};



//Do the actions: change comic + check if button can be clicked
reset.addEventListener("click", () => {
    to_latest();
    updateNextButtonState();
    updatePreviousButtonState();
});

suivant.addEventListener("click", () => {
    next();
    updateNextButtonState();
    updatePreviousButtonState();
});

precedent.addEventListener("click", () => {
    previous();
    updateNextButtonState();
    updatePreviousButtonState();
});
