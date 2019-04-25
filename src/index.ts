import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the snippet extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'snippet',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension snippet is activated!');
  }
};

export default extension;
