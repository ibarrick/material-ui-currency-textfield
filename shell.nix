with import <nixpkgs> { config.permittedInsecurePackages = [ "nodejs-10.24.1" "nodejs-12.22.12" ]; };
let nodejs-8 = import /etc/nixos/custom-packages/nodejs-8.nix; yarn-8 = import /etc/nixos/custom-packages/yarn-node8.nix;
in stdenv.mkDerivation {
    name = "node";
    buildInputs = [
        nodejs-12_x
		python27
		yarn
	
    ];
    shellHook = ''
        export NIXPKGS_ALLOW_INSECURE=1
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}

