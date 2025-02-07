import { useState, ReactNode } from 'react';
import { ListItemText, ListItemButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ICON_SIZE } from '../../../../../constants';

interface UserDrawerListProps {
  title: string;
  children: ReactNode;
}

const UserDrawerList = ({ children, title }: UserDrawerListProps) => {
  const [openList, setOpenList] = useState(true);
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
