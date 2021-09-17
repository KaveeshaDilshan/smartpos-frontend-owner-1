import Swal from 'sweetalert2';

export const checkErrorResponse = (error) => {
  if (error && !error.message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error && error ? error : 'Something went wrong..',
    });
  } else if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text:
        error.message && error.message
          ? error.message
          : 'Something went wrong..',
    });
  } else {
    Swal.fire('Oops...', 'Something went wrong..', 'error');
  }
};

export const checkSuccessResponse = (success) => {
  if (success) {
    if (
      success.CodeDeliveryDetails &&
      success.CodeDeliveryDetails.AttributeName === 'email'
    ) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Reset code sent to ${success.CodeDeliveryDetails.Destination}`,
      });
    } else if (success === 'SUCCESS') {
      Swal.fire({
        icon: 'success',
        title: 'Success',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Success',
      });
    }
  }
};

export const showLoginWarning = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Warning',
    text: 'Please Login before continue...',
  });
};
