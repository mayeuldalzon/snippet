import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';


/**
 * Initialization data for the snippet extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'snippet',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
  console.log('JupyterLab extension snippet is activated!');

  // Create a single widget
  let widget: Widget = new Widget();
  widget.id = 'snippet';
  widget.title.label = 'snippet.com';
  widget.title.closable = true;

  // Add an application command
  const command: string = 'snippet:open';
  app.commands.addCommand(command, {
    label: 'snippet example',
    execute: () => {
      if (!widget.isAttached) {
        // Attach the widget to the main work area if it's not there
        app.shell.addToMainArea(widget);
      }
      // Activate the widget
      app.shell.activateById(widget.id);
    }
  });

  // Add the command to the palette.
  palette.addItem({command, category: 'Snippet'});
}
};

export default extension;
