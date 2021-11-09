import  React,{useState, useEffect} from 'react';
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { AlertTitle } from '@mui/material';

export default Notification = ({ severity, message }) => {
  const [show, setShow] = useState(true)

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severity} sx={{ width: '280px', margin:'auto' }}>
        <AlertTitle>{severity==='error' ? 'Error' : severity==='info' ? 'Info': 'success'}</AlertTitle>
          {message}
      </Alert>
    </Stack >
 
  );
}