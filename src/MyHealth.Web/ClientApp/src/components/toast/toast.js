import cogoToast from 'cogo-toast';


export const notifySuccess = (msg) => {
    cogoToast.success(msg, {
        position: 'top-right', heading: 'Success', onClick: (hide) => {
            hide(true);
        }
    });
}

export const notifyError = (msg) => {
    cogoToast.error(msg, {
        position: 'top-right', heading: 'Error', onClick: (hide) => {
            hide(true);
        }
    });
}


export const notifyInfo = (msg) => {
    cogoToast.info(msg, {
        position: 'top-right', heading: 'Info', onClick: (hide) => {
            hide(true);
        }
    });
}