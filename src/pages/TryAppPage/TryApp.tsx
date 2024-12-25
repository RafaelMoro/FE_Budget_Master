import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../RoutesConstants';

const TryApp = () => {
  const navigate = useNavigate();
  const handleClickSampleData = () => navigate(DASHBOARD_ROUTE);

  return (
    <main>
      <h1>Bienvenido a Budget Master</h1>
      <p>Para probar la aplicación podemos cargar datos de ejemplo o puedes decidir crear todos los datos por ti mismo.</p>
      <button type="button" onClick={handleClickSampleData}>Usar datos de muestra</button>
      <button type="button" onClick={handleClickSampleData}>Usar mis propios datos</button>
    </main>
  );
};

export { TryApp };
