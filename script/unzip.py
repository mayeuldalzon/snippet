from sklearn import tree
import graphviz
import os

#Need zipfile
import sys
from six.moves import urllib
import os
import zipfile

URL = "https://graphviz.gitlab.io/_pages/Download/windows/graphviz-2.38.zip"
PATH = "graphviz"

def download_progress(count, block_size, total_size):
    percent = count * block_size * 100 // total_size
    sys.stdout.write("\rDownloading: {}%".format(percent))
    sys.stdout.flush()

def fetch(url=URL, path=PATH):
    if os.path.exists(PATH):
        return
    os.makedirs(path, exist_ok=True)
    zip_path = os.path.join(path, "graphviz-2.38.zip")
    urllib.request.urlretrieve(url, zip_path, reporthook=download_progress)
    folder_zip = zipfile.ZipFile(zip_path)
    folder_zip.extractall(path=path)
    folder_zip.close()
    os.remove(zip_path)
    
fetch()
