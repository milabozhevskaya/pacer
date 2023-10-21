export { styles as buttonStyles };

const styles = {
  position: "relative",
  minWidth: '130px',
  height: '40px',
  boxShadow: `#f6c3411f 0px 2px 4px 0px, #eb8d3c52 0px 2px 16px 0px`,
  borderRadius: '5px',
  // boxShadow: `inset 0 -3em 3em rgba(0, 0, 0, 0.1),
  //   0 0 0 0.5px rgb(178, 167, 167), 0.2em 0.2em 1em rgba(0, 0, 0, 0.3)`,
  border: '1px solid #eb8d3c54',
  textTransform: 'uppercase',
  transition: '0.6s',
  textAlign: 'center',
  pointerEvents: 'auto',
  color: '#772626c9',
  // color: 'rgb(49, 49, 49)',
  background: '#eba05f6b',
  // background: 'rgba(229, 229, 229, .4)',
  span: {
    fontWeight: '600',
    fontSize: '18px',
    padding: '0 15px',
    letterSpacing: '2px',
  },
  hover: {
    boxShadow: `#f6c3411f 0px 2px 4px 0px, #eb8d3ca1 0px 2px 16px 0px`,
    transition: '0.6s',
  }
};
