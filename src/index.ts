import {
  JupyterLab, JupyterLabPlugin, ILayoutRestorer
} from '@jupyterlab/application';

import {
  ICommandPalette, InstanceTracker
} from '@jupyterlab/apputils';

import {
  JSONExt
} from '@phosphor/coreutils';

import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';


class snippetWidget extends Widget {
  /**
   * Construct a new snippet widget.
   */
  constructor() {
      super();
      // Create a single widget
	  this.id = 'snippet';
	  this.title.label = 'snippet.com';
	  this.title.closable = true;
	  this.addClass('snippetWidget');

	  // Add a text element to the panel
      this.texte = document.createElement('pre');
	  this.texte.setAttribute("style","word-wrap: break-word; white-space: pre-wrap; padding: 5px; overflow: auto;");
	  this.texte.id = ("code");
      this.node.appendChild(this.texte);

	 //Fetch info about a random python file
		fetch('https://raw.githubusercontent.com/mayeuldalzon/snippet/master/script/unzip.py').then(response => {
		  return response.text();
		}).then(data => {
		  this.tx =document.createTextNode(data)
		  this.texte.appendChild(this.tx);	  
		});
  };
  readonly texte: any;
  tx: any ;  
}

function activate(app: JupyterLab, palette: ICommandPalette, restorer: ILayoutRestorer) {
	console.log('JupyterLab extension snippet is activated!');
	let widget: snippetWidget;
	 // Add an application command
    const command: string = 'snippet:open';
    app.commands.addCommand(command, {
    label: 'snippet example',
    execute: () => {
      if (!widget) {
        // Create a new widget if one does not exist
        widget = new snippetWidget();
        widget.update();
      }
      if (!tracker.has(widget)) {
        // Track the state of the widget for later restoration
        tracker.add(widget);
      }
      if (!widget.isAttached) {
        // Attach the widget to the main work area if it's not there
        app.shell.addToMainArea(widget);
      } else {
        // Refresh the comic in the widget
        widget.update();
      }
      // Activate the widget
      app.shell.activateById(widget.id);
	}
	});  
	  // Add the command to the palette.
      palette.addItem({command, category: 'Snippet'});
	  
	  // Track and restore the widget state
	  let tracker = new InstanceTracker<Widget>({ namespace: 'snippet' });
	  restorer.restore(tracker, {
		command,
		args: () => JSONExt.emptyObject,
		name: () => 'snippet'

    });
  };
/**
 * Initialization data for the snippet extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'snippet',
  autoStart: true,
  requires: [ICommandPalette,  ILayoutRestorer],
  activate: activate
};

export default extension;
