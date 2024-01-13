import { Link, LinkProps } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

export default function MyLink({ onClick, href, ...props }: LinkProps) {
  const navigate = useNavigate();

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        href && navigate(href);
        onClick?.(e);
      }}
      href={href}
      {...props}
    />
  );
}
