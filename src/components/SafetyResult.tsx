
import { ContentCheckResult } from "@/services/apiService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X } from "lucide-react";

interface SafetyResultProps {
  result: ContentCheckResult;
}

const SafetyResult = ({ result }: SafetyResultProps) => {
  const { isSafe, categories, transcript } = result;

  const getCategoryCount = () => {
    if (!categories) return 0;
    return Object.values(categories).filter(Boolean).length;
  };

  const getResultClasses = () => {
    return isSafe
      ? "bg-green-50 border-safe text-safe"
      : "bg-red-50 border-unsafe text-unsafe";
  };

  const getStatusIcon = () => {
    return isSafe ? (
      <Check className="h-8 w-8" />
    ) : (
      <X className="h-8 w-8" />
    );
  };

  return (
    <Card className={`w-full max-w-2xl border-2 ${getResultClasses()}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            {getStatusIcon()}
            {isSafe ? "SAFE" : "NOT SAFE"}
          </CardTitle>
          {!isSafe && categories && (
            <Badge variant="outline" className="text-unsafe border-unsafe">
              {getCategoryCount()} issue{getCategoryCount() !== 1 ? "s" : ""} detected
            </Badge>
          )}
        </div>
        <CardDescription className={isSafe ? "text-green-700" : "text-red-700"}>
          {isSafe
            ? "This content appears to be safe for viewing."
            : "This content may contain potentially sensitive material."}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {!isSafe && categories && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium">Issues Detected:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(categories).map(
                ([key, value]) =>
                  value && (
                    <Badge
                      key={key}
                      variant="outline"
                      className="justify-start border-unsafe text-unsafe py-1"
                    >
                      <X className="h-3 w-3 mr-1" />
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Badge>
                  )
              )}
            </div>
          </div>
        )}
        
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="transcript">
            <AccordionTrigger>View Transcript</AccordionTrigger>
            <AccordionContent>
              <div className="max-h-48 overflow-y-auto bg-muted rounded-md p-3 text-sm">
                {transcript}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SafetyResult;
