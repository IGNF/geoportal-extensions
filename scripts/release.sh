

build () {};

createPackageJson () {};
createBowerJson () {};

gitCommand () {};

    gitCommand("git checkout %repository%");
    gitCommand("git add %files% -f");
    gitCommand("git commit -m %message%");
    gitCommand("git tag %version%");
    gitCommand("git push");

createMetaInfo () {};

publish () {};
