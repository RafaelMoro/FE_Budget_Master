import { useState, ReactNode } from 'react';
import { ListItemText, ListItemButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ICON_SIZE } from '../../../../../constants';

interface UserDrawerListProps {
  open?: boolean;
  title: string;
  children: ReactNode;
}

const UserDrawerList = ({ children, title, open = true }: UserDrawerListProps) => {
  const [openList, setOpenList] = useState(open);
  const handleClick = () => setOpenList((prevState) => !prevState);

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={title} />
        {openList ? <ExpandLess sx={ICON_SIZE} /> : <ExpandMore sx={ICON_SIZE} />}
      </ListItemButton>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};

export { UserDrawerList };
