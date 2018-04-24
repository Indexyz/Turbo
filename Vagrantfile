# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.box_version = "1802.01"

  config.vm.network "private_network", ip: "192.168.137.2", auto_config: true

  config.vm.synced_folder ".", "/project"

  config.vm.provider "hyperv" do |h|
    h.vm_integration_services = {
        guest_service_interface: true,
        heartbeat: true,
        key_value_pair_exchange: true,
        shutdown: true,
        time_synchronization: true,
        vss: true
    }
  end

  config.vm.provision "shell", inline: <<-SHELL
    curl -sSL get.docker.com | bash
    systemctl enable docker
    systemctl start docker
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.9/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 9
    curl -sSL https://yarnpkg.com/install.sh | bash
  SHELL
end
