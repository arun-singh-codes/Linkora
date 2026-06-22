
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";

const options = [
  {
    label: "Home",
    route: "/dashboard",
  },
  {
    label: "My Network",
    route: "/MyConnections",
  },
  {
    label: "Notifications",
    route: "/Notifications",
  },
  {
    label: "Jobs",
    route: null,
  },
  {
    label: "Messages",
    route: null,
  },
  {
    label: "Notifications",
    route: "/Notifications",
  },
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    handleClose();

    if (option.route) {
      router.push(option.route);
    } else {
      alert("Coming Soon 🚀");
      // ya toast.info("Coming Soon 🚀");
    }
  };

  return (
    <div>
      <MenuIcon
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      />

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}