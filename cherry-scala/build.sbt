name := "cherry-scala"

version := "1.0.0"

scalaVersion := "2.10.0"

scalacOptions := Seq("-deprecation", "-unchecked")

libraryDependencies ++= Seq(
	"org.scalatest" %% "scalatest" % "1.9.1" % "test"
)
