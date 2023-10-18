export const styles = {
  marginRight: '10px',
  width: 'fit-content',
  boxShadow: `#f6c3411f 0px 2px 4px 0px, #eb8d3c52 0px 2px 16px 0px`,
  borderRadius: '5px',
  border: '1px solid #eb8d3c54',
  color: '#7c4747',
  transition: '.4s ease-in-out',
  onfocus: {
    color: '#b75621',
    border: '1px solid #f0ad73',
  },
  label: {
    display: 'inline-flex',
    cursor: 'pointer',
    fontSize: '22px',
    fontWeight: 'bold',
    position: 'relative',
  },
  span: {
    minWidth: '44px',
    minHeight: '44px',
    textAlign: 'center',
    padding: '0 15px',
    opacity: 0,
  },
  input: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0 15px',
    backgroundColor: 'transparent',
    color: 'currentColor',
    onfocus: {
      cursor: 'auto',
      outline: 'none',
    }
  }
}
