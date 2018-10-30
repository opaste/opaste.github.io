import {Controller} from 'stimulus';
import CodeFlask    from 'codeflask';
import database     from './database'
import helpers      from './helpers';

export default class extends Controller {

    /**
     *
     */
    connect() {
        this.initEditor();
    }

    /**
     *
     * @param gistId
     */
    initEditor(gistId = helpers.getUrlParam('gist')) {

        const flask = new CodeFlask('#code', {
            language: 'js',
            lineNumbers: true,
        });

        flask.onUpdate((code) => {
            this.data.set("code",  window.btoa(unescape(encodeURIComponent(code))))
        });


        if(gistId === null){
            return;
        }

        database.loadGist(gistId).then(snapshot => {
            let codeGist = snapshot.val() && snapshot.val().code || 'let gist = "404 Not Found";';
            flask.updateCode(codeGist);
        });
    }

    /**
     *
     */
    save() {
        let code = decodeURIComponent(escape((window.atob(this.data.get("code")))));
        let id = helpers.uuidv4();
        database.saveGist(id, code);

        window.history.replaceState(
            document.getElementsByTagName("html")[0].innerHTML,
            document.getElementsByTagName("title")[0].innerHTML,
            location.origin + "?gist=" + id
        );
    }
}