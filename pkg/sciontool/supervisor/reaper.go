/*
Copyright 2025 The Scion Authors.
*/

package supervisor

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/ptone/scion-agent/pkg/sciontool/log"
)

// StartReaper starts a goroutine that reaps zombie processes and logs them.
func StartReaper() {
	go func() {
		sigs := make(chan os.Signal, 1)
		signal.Notify(sigs, syscall.SIGCHLD)

		for range sigs {
			for {
				var ws syscall.WaitStatus
				pid, err := syscall.Wait4(-1, &ws, syscall.WNOHANG, nil)
				if err != nil {
					break
				}
				if pid <= 0 {
					break
				}

				reason := "exited"
				if ws.Signaled() {
					reason = "killed by signal " + ws.Signal().String()
				}
				log.Info("Reaped zombie process %d (reason: %s, exit code: %d)", pid, reason, ws.ExitStatus())
			}
		}
	}()
}
