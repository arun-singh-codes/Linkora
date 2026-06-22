// import * as React from 'react';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';

// const options = ['Show Users with posts', 'Show Users Only', 'Rebase and merge'];

// export default function SplitButton() {
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);
//   const [selectedIndex, setSelectedIndex] = React.useState(1);
//   console.log(anchorRef.current)
//   const handleClick = () => {
//     console.info(`You clicked ${options[selectedIndex]}`);
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     setOpen(false);
//   };

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     console.log("hellot" + event.target)
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
      
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <ButtonGroup
//         sx={{height:"1rem" , fontSize:"1rem" , width:"100%" ,height:"1.5rem"}}
//         variant="contained"
//         ref={anchorRef}
//         aria-label="Button group with a nested menu"
//       >
//         <Button sx={{fontSize:"0.8rem" ,textTransform: 'none' , height:"100%" ,padding:"none"}} onClick={handleClick}>{options[selectedIndex]}</Button>
//         <Button
//           size="small"
//           aria-controls={open ? 'split-button-menu' : undefined}
//           aria-expanded={open ? 'true' : undefined}
//           aria-label="select merge strategy"
//           aria-haspopup="menu"
//           onClick={handleToggle}
//         >
//           <ArrowDropDownIcon />
//         </Button>
//       </ButtonGroup>
//       <Popper
//         sx={{ zIndex: 1 }}
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//       >
//         {({ TransitionProps, placement }) => (
//           <Grow
//             {...TransitionProps}
//             style={{
//               transformOrigin:
//                 placement === 'bottom' ? 'center top' : 'center bottom',
//             }}
//           >
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MenuList id="split-button-menu" autoFocusItem>
//                   {options.map((option, index) => (
//                     <MenuItem
//                       key={option}
//                       disabled={index === 2}
//                       selected={index === selectedIndex}
//                       onClick={(event) => handleMenuItemClick(event, index)}
//                     >
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </MenuList>
//               </ClickAwayListener>
//             </Paper>
//           </Grow>
//         )}
//       </Popper>
//     </React.Fragment>
//   );
// }
