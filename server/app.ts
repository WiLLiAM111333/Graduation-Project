import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { SkolmatenController } from './routes/skolmaten';
import { SchedulesController } from './routes/schedules';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(cors({ // Temp config
  origin: '*',
  optionsSuccessStatus: 200
}));

new SkolmatenController().mount(app);
new SchedulesController().mount(app);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
